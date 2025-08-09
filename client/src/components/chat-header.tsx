import { Trash2, Settings, Wifi, WifiOff, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClearChat: () => void;
  username?: string | null;
  isConnected?: boolean;
}

export default function ChatHeader({ onClearChat, username, isConnected }: ChatHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Users className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Chat em Tempo Real</h1>
            <div className="flex items-center space-x-2">
              {username && (
                <p className="text-sm text-slate-600">Conectado como {username}</p>
              )}
              <div className="flex items-center space-x-1">
                {isConnected ? (
                  <Wifi className="h-3 w-3 text-green-500" />
                ) : (
                  <WifiOff className="h-3 w-3 text-red-500" />
                )}
                <p className="text-xs text-slate-500">
                  {isConnected ? "Online" : "Desconectado"}
                </p>
              </div>
            </div>
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
