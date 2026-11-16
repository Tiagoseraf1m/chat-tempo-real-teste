
import { useState, useEffect, useRef } from "react";

import { useToast } from "@/hooks/use-toast";

import { useWebSocket } from "@/hooks/use-websocket";

import ChatHeader from "../components/chat-header";

import ChatMessages from "../components/chat-messages";

import ChatInput from "../components/chat-input";

import UsernameModal from "../components/username-modal";

export default function Chat() {
  const [username, setUsername] = useState<string | null>(null);
  const [showUsernameModal, setShowUsernameModal] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  const {
    messages,
    isConnected,
    connect,
    sendMessage,
    disconnect,
  } = useWebSocket();

  // Conecta ao WebSocket quando o usuário informa seu nome
  useEffect(() => {
    if (!username) return;

    connect();

    return () => {
      disconnect();
    };
  }, [username, connect, disconnect]);

  const handleUsernameSubmit = (newUsername: string) => {
    setUsername(newUsername);
    setShowUsernameModal(false);

    toast({
      title: "Entrando no chat!",
      description: `Bem-vindo ao chat, ${newUsername}!`,
    });
  };

  const handleSendMessage = (content: string) => {
    if (content.trim() && username && isConnected) {
      sendMessage(content.trim(), username);
    } else if (!isConnected) {
      toast({
        title: "Desconectado",
        description: "Tentando reconectar...",
        variant: "destructive",
      });
    }
  };

  const handleClearChat = () => {
    toast({
      title: "Info",
      description: "Função de limpar chat não disponível no modo tempo real.",
    });
  };

  // Rola automaticamente para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <UsernameModal
        isOpen={showUsernameModal}
        onSubmit={handleUsernameSubmit}
      />

      <div className="bg-slate-50 min-h-screen">
        <div className="flex flex-col h-screen max-w-4xl mx-auto border-x border-slate-200 bg-white">

          <ChatHeader
            onClearChat={handleClearChat}
            username={username}
            isConnected={isConnected}
          />

          <ChatMessages
            messages={messages}
            isLoading={false}
            isTyping={false}
            currentUsername={username}
          />

          <div ref={messagesEndRef} />

          <ChatInput
            onSendMessage={handleSendMessage}
            isDisabled={!isConnected || !username}
          />

        </div>
      </div>
    </>
  );
}
