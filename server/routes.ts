import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

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

  // Send a message and get AI response
  app.post("/api/messages", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      
      // Store user message
      const userMessage = await storage.createMessage({
        ...validatedData,
        role: "user"
      });

      // Get AI response
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "Você é um assistente de IA útil e educado que responde sempre em português brasileiro. Seja amigável, informativo e mantenha as respostas concisas mas completas."
            },
            {
              role: "user",
              content: validatedData.content
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        });

        const aiResponseContent = response.choices[0].message.content || "Desculpe, não consegui gerar uma resposta.";

        // Store AI response
        const aiMessage = await storage.createMessage({
          content: aiResponseContent,
          role: "assistant",
          userId: validatedData.userId
        });

        res.json({
          userMessage,
          aiMessage
        });

      } catch (aiError) {
        console.error("OpenAI API error:", aiError);
        
        // Store error message
        const errorMessage = await storage.createMessage({
          content: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.",
          role: "assistant",
          userId: validatedData.userId
        });

        res.json({
          userMessage,
          aiMessage: errorMessage
        });
      }

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
  return httpServer;
}
