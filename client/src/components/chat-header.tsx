import { Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClearChat: () => void;
}

export default function ChatHeader({ onClearChat }: ChatHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
            <i className="fas fa-robot text-white text-lg"></i>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Assistente IA</h1>
            <p className="text-sm text-slate-500">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearChat}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
