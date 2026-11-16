
import { useState, useEffect, useRef, useCallback } from "react";
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
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReconnectRef = useRef(false);

  const connect = useCallback(() => {
    // Evita conexões duplicadas
    if (
      wsRef.current?.readyState === WebSocket.OPEN ||
      wsRef.current?.readyState === WebSocket.CONNECTING
    ) {
      return;
    }

    shouldReconnectRef.current = true;

    // Cancela uma tentativa de reconexão anterior
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        if (wsRef.current !== ws) return;

        console.log("WebSocket conectado");
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        if (wsRef.current !== ws) return;

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
                setMessages((prev) => [...prev, data.message!]);
              }
              break;

            default:
              break;
          }
        } catch (error) {
          console.error("Erro ao processar mensagem WebSocket:", error);
        }
      };

      ws.onclose = () => {
        if (wsRef.current !== ws) return;

        console.log("WebSocket desconectado");

        wsRef.current = null;
        setIsConnected(false);

        // Reconecta somente se a desconexão não foi intencional
        if (shouldReconnectRef.current) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectTimeoutRef.current = null;
            connect();
          }, 3000);
        }
      };

      ws.onerror = (error) => {
        console.error("Erro WebSocket:", error);
        setIsConnected(false);
      };
    } catch (error) {
      console.error("Erro ao conectar WebSocket:", error);
      setIsConnected(false);
    }
  }, []);

  const sendMessage = useCallback((content: string, username: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "send_message",
          data: {
            content,
            username,
          },
        })
      );
    }
  }, []);

  const disconnect = useCallback(() => {
    shouldReconnectRef.current = false;

    // Cancela reconexões pendentes
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      const ws = wsRef.current;
      wsRef.current = null;

      if (
        ws.readyState === WebSocket.CONNECTING ||
        ws.readyState === WebSocket.OPEN
      ) {
        ws.close();
      }
    }

    setIsConnected(false);
  }, []);

  // Encerra a conexão quando o componente é desmontado
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    messages,
    isConnected,
    onlineUsers,
    connect,
    sendMessage,
    disconnect,
  };
}
