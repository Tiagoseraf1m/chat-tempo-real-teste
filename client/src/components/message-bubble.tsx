import { type Message } from "@shared/schema";

interface MessageBubbleProps {
  message: Message;
  timestamp: string;
}

export default function MessageBubble({ message, timestamp }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isError = message.isError;

  if (isUser) {
    return (
      <div className="flex items-start space-x-3 justify-end animate-slide-in">
        <div className="flex-1 flex flex-col items-end">
          <div className="bg-emerald-500 text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-xs sm:max-w-sm md:max-w-md shadow-sm">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          <p className="text-xs text-slate-400 mt-1 mr-1">{timestamp}</p>
        </div>
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
          <i className="fas fa-user text-white text-xs"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 animate-fade-in">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
        <i className="fas fa-robot text-white text-xs"></i>
      </div>
      <div className="flex-1">
        <div className={`rounded-2xl rounded-tl-md px-4 py-3 max-w-xs sm:max-w-sm md:max-w-md shadow-sm ${
          isError 
            ? "bg-red-100 text-red-800 border border-red-200" 
            : "bg-blue-600 text-white"
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className="text-xs text-slate-400 mt-1 ml-1">{timestamp}</p>
      </div>
    </div>
  );
}
