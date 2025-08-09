import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface UsernameModalProps {
  isOpen: boolean;
  onSubmit: (username: string) => void;
}

export default function UsernameModal({ isOpen, onSubmit }: UsernameModalProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bem-vindo ao Chat!</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Digite seu nome..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={50}
              className="w-full"
              autoFocus
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={!username.trim()}
          >
            Entrar no Chat
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}