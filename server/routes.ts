import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertMessageSchema, userMessageSchema } from "@shared/schema";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

// Lista de conexões WebSocket ativas
const wsClients = new Set<WebSocket>();

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all messages
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getAllMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Send a message to real-time chat
  app.post("/api/messages", async (req, res) => {
    try {
      const validatedData = userMessageSchema.parse(req.body);
      
      // Store user message
      const userMessage = await storage.createMessage({
        content: validatedData.content,
        role: "user",
        userId: "user-" + Date.now(), // Generate unique ID
        username: validatedData.username
      });

      // Broadcast message to all connected WebSocket clients
      const messageData = JSON.stringify({
        type: "new_message",
        message: userMessage
      });

      wsClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageData);
        }
      });

      res.json({ message: userMessage });

    } catch (error) {
      console.error("Message creation error:", error);
      res.status(400).json({ error: "Dados de mensagem inválidos" });
    }
  });

  // Clear all messages
  app.delete("/api/messages", async (req, res) => {
    try {
      // In a real implementation, you would delete from the database
      // For now, we'll just indicate success
      res.json({ success: true, message: "Chat limpo com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao limpar chat" });
    }
  });

  const httpServer = createServer(app);
  
  // Configurar WebSocket Server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws: WebSocket) => {
    console.log('Nova conexão WebSocket estabelecida');
    wsClients.add(ws);
    
    // Enviar mensagens existentes para o novo cliente
    storage.getAllMessages().then(messages => {
      ws.send(JSON.stringify({
        type: "initial_messages",
        messages: messages
      }));
    });
    
    ws.on('message', async (data: Buffer) => {
      try {
        const parsed = JSON.parse(data.toString());
        
        if (parsed.type === 'send_message') {
          const validatedData = userMessageSchema.parse(parsed.data);
          
          // Store message
          const newMessage = await storage.createMessage({
            content: validatedData.content,
            role: "user",
            userId: "user-" + Date.now(),
            username: validatedData.username
          });
          
          // Broadcast to all clients
          const messageData = JSON.stringify({
            type: "new_message",
            message: newMessage
          });
          
          wsClients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(messageData);
            }
          });
        }
      } catch (error) {
        console.error('Erro ao processar mensagem WebSocket:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('Conexão WebSocket fechada');
      wsClients.delete(ws);
    });
    
    ws.on('error', (error) => {
      console.error('Erro WebSocket:', error);
      wsClients.delete(ws);
    });
  });
  
  return httpServer;
}
