import { useState, useEffect, useRef } from "react";
import { type Message } from "@shared/schema";

interface WebSocketMessage {
  type: "new_message" | "initial_messages" | "user_connected" | "user_disconnected";
  message?: Message;
  messages?: Message[];
  username?: string;
}

export function useWebSocket() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    try {
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        console.log("WebSocket conectado");
        setIsConnected(true);
      };
      
      wsRef.current.onmessage = (event) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          
          switch (data.type) {
            case "initial_messages":
              if (data.messages) {
                setMessages(data.messages);
              }
              break;
            case "new_message":
              if (data.message) {
                setMessages(prev => [...prev, data.message!]);
              }
              break;
            default:
              break;
          }
        } catch (error) {
          console.error("Erro ao processar mensagem WebSocket:", error);
        }
      };
      
      wsRef.current.onclose = () => {
        console.log("WebSocket desconectado");
        setIsConnected(false);
        // Tentar reconectar após 3 segundos
        setTimeout(connect, 3000);
      };
      
      wsRef.current.onerror = (error) => {
        console.error("Erro WebSocket:", error);
        setIsConnected(false);
      };
    } catch (error) {
      console.error("Erro ao conectar WebSocket:", error);
      setIsConnected(false);
    }
  };

  const sendMessage = (content: string, username: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: "send_message",
        data: {
          content,
          username
        }
      }));
    }
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return {
    messages,
    isConnected,
    onlineUsers,
    connect,
    sendMessage,
    disconnect
  };
}