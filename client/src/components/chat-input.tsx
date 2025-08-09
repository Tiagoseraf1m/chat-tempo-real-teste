import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isDisabled: boolean;
}

export default function ChatInput({ onSendMessage, isDisabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isDisabled) {
      onSendMessage(message);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  };

  const characterCount = message.length;
  const maxLength = 2000;

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={isDisabled ? "Conectando..." : "Digite sua mensagem..."}
              className="w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 pr-12 text-sm placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50 transition-colors duration-200 min-h-[52px]"
              rows={1}
              maxLength={maxLength}
              disabled={isDisabled}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute bottom-2 right-2 p-2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <span className={`text-xs ${characterCount > 1800 ? 'text-red-400' : 'text-slate-400'}`}>
              {characterCount}/{maxLength}
            </span>
            <span className="text-xs text-slate-400">Pressione Enter para enviar</span>
          </div>
        </div>
        <Button
          type="submit"
          disabled={!message.trim() || isDisabled}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-3 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </footer>
  );
}
