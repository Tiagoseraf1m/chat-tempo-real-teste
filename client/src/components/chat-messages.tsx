import { type Message } from "@shared/schema";
import MessageBubble from "./message-bubble";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
  currentUsername?: string | null;
}

export default function ChatMessages({ messages, isLoading, isTyping, currentUsername }: ChatMessagesProps) {
  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4 messages-container">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start space-x-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-12 w-64 rounded-2xl" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4 messages-container">
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="flex justify-center items-center py-8 animate-fade-in">
          <div className="text-center text-slate-500">
            <Users className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            <p className="text-lg font-medium">Bem-vindo ao chat!</p>
            <p className="text-sm">Envie uma mensagem para começar a conversar com outros usuários.</p>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          timestamp={formatTime(message.timestamp)}
          isOwnMessage={currentUsername === message.username}
        />
      ))}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-start space-x-3 animate-fade-in">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="fas fa-robot text-white text-xs"></i>
          </div>
          <div className="flex-1">
            <div className="bg-slate-100 rounded-2xl rounded-tl-md px-4 py-3 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
