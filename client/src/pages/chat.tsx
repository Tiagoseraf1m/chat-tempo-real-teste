import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type Message } from "@shared/schema";
import ChatHeader from "../components/chat-header";
import ChatMessages from "../components/chat-messages";
import ChatInput from "../components/chat-input";

export default function Chat() {
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fetch messages
  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
    refetchInterval: false,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ content }: { content: string }) => {
      const response = await apiRequest("POST", "/api/messages", {
        content,
        role: "user",
        userId: "guest", // For demo purposes, using guest user
      });
      return response.json();
    },
    onMutate: () => {
      setIsTyping(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      setIsTyping(false);
    },
    onError: (error) => {
      setIsTyping(false);
      console.error("Error sending message:", error);
      toast({
        title: "Erro",
        description: "Erro ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // Clear chat mutation
  const clearChatMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/messages");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      toast({
        title: "Sucesso",
        description: "Chat limpo com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Error clearing chat:", error);
      toast({
        title: "Erro",
        description: "Erro ao limpar chat. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (content: string) => {
    if (content.trim() && !sendMessageMutation.isPending) {
      sendMessageMutation.mutate({ content: content.trim() });
    }
  };

  const handleClearChat = () => {
    clearChatMutation.mutate();
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="flex flex-col h-screen max-w-4xl mx-auto border-x border-slate-200 bg-white">
        <ChatHeader onClearChat={handleClearChat} />
        
        <ChatMessages 
          messages={messages} 
          isLoading={isLoading}
          isTyping={isTyping}
        />
        
        <div ref={messagesEndRef} />
        
        <ChatInput 
          onSendMessage={handleSendMessage}
          isDisabled={sendMessageMutation.isPending}
        />
      </div>
    </div>
  );
}
