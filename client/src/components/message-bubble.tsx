import { type Message } from "@shared/schema";

interface MessageBubbleProps {
  message: Message;
  timestamp: string;
  isOwnMessage?: boolean;
}

export default function MessageBubble({ message, timestamp, isOwnMessage }: MessageBubbleProps) {
  const isUser = message.role === "user";
  
  if (isOwnMessage) {
    return (
      <div className="flex items-start space-x-3 justify-end animate-slide-in">
        <div className="flex-1 flex flex-col items-end">
          <div className="bg-blue-600 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-xs sm:max-w-sm md:max-w-md shadow-sm">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          <div className="flex items-center space-x-1 mt-1 mr-1">
            <p className="text-xs text-slate-400">Você</p>
            <span className="text-xs text-slate-400">•</span>
            <p className="text-xs text-slate-400">{timestamp}</p>
          </div>
        </div>
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="fas fa-user text-white text-xs"></i>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex items-start space-x-3 animate-fade-in">
        <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="fas fa-user text-white text-xs"></i>
        </div>
        <div className="flex-1">
          <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-md px-4 py-3 max-w-xs sm:max-w-sm md:max-w-md shadow-sm">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          <div className="flex items-center space-x-1 mt-1 ml-1">
            <p className="text-xs text-slate-600 font-medium">{message.username || 'Usuário'}</p>
            <span className="text-xs text-slate-400">•</span>
            <p className="text-xs text-slate-400">{timestamp}</p>
          </div>
        </div>
      </div>
    );
  }

  // This shouldn't happen in the real-time chat, but keep it for backward compatibility
  return (
    <div className="flex items-start space-x-3 animate-fade-in">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
        <i className="fas fa-robot text-white text-xs"></i>
      </div>
      <div className="flex-1">
        <div className="bg-blue-600 text-white rounded-2xl rounded-tl-md px-4 py-3 max-w-xs sm:max-w-sm md:max-w-md shadow-sm">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className="text-xs text-slate-400 mt-1 ml-1">{timestamp}</p>
      </div>
    </div>
  );
}
