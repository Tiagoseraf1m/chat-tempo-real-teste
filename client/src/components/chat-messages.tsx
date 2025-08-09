import { type Message } from "@shared/schema";
import MessageBubble from "./message-bubble";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
}

export default function ChatMessages({ messages, isLoading, isTyping }: ChatMessagesProps) {
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
        <div className="flex items-start space-x-3 animate-fade-in">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
            <i className="fas fa-robot text-white text-xs"></i>
          </div>
          <div className="flex-1">
            <div className="bg-blue-600 text-white rounded-2xl rounded-tl-md px-4 py-3 max-w-xs sm:max-w-sm md:max-w-md shadow-sm">
              <p className="text-sm leading-relaxed">Olá! Sou seu assistente de IA. Como posso ajudá-lo hoje?</p>
            </div>
            <p className="text-xs text-slate-400 mt-1 ml-1">Agora mesmo</p>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          timestamp={formatTime(message.timestamp)}
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
