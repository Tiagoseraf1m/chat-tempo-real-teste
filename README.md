# Chat em Tempo Real

Um sistema de chat em tempo real multi-usuário construído com React, Express.js, TypeScript e WebSockets.

## ✨ Funcionalidades

- **Chat em tempo real**: Mensagens instantâneas usando WebSockets
- **Multi-usuário**: Várias pessoas podem conversar simultaneamente
- **Interface moderna**: Design responsivo com Tailwind CSS
- **Indicador de conexão**: Mostra status online/offline
- **Reconexão automática**: Se reconecta automaticamente quando a conexão cai
- **Identificação de usuário**: Mensagens próprias destacadas
- **Validação de dados**: Validação robusta com Zod

## 🚀 Tecnologias Utilizadas

### Frontend
- React 18 com TypeScript
- Vite (build tool)
- Tailwind CSS para estilização
- Radix UI para componentes base
- TanStack Query para gerenciamento de estado
- Wouter para roteamento
- Zod para validação

### Backend
- Express.js com TypeScript
- WebSocket (ws) para comunicação em tempo real
- Drizzle ORM (preparado para PostgreSQL)
- Armazenamento em memória (pode ser facilmente migrado para banco de dados)

## 📦 Instalação

### 1. Clone o projeto
```bash
git clone [seu-repositorio]
cd chat-tempo-real
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o projeto
```bash
npm run dev
```

O servidor será iniciado na porta 5000 e estará disponível em `http://localhost:5000`.

## 🏗️ Estrutura do Projeto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilitários e configurações
│   │   └── pages/         # Páginas da aplicação
│   └── index.html
├── server/                # Backend Express
│   ├── index.ts          # Ponto de entrada do servidor
│   ├── routes.ts         # Rotas da API e WebSocket
│   ├── storage.ts        # Camada de armazenamento
│   └── vite.ts           # Configuração do Vite
├── shared/               # Tipos e schemas compartilhados
│   └── schema.ts
└── package.json
```

## 🔧 Configuração

### Variáveis de Ambiente (opcionais)

Se quiser integrar com OpenAI para um bot de chat:
```bash
OPENAI_API_KEY=sua_chave_aqui
```

### Personalização

1. **Cores e Design**: Edite `client/src/index.css` para personalizar as cores
2. **Limite de Mensagens**: Modifique `maxLength` em `chat-input.tsx`
3. **Validações**: Ajuste os schemas em `shared/schema.ts`

## 🚀 Deploy

### Vercel/Netlify
1. Configure as variáveis de ambiente na plataforma
2. O build será feito automaticamente com `npm run build`

### VPS/Servidor Próprio
```bash
npm run build
npm start
```

## 🔄 Migração para Banco de Dados

O projeto está preparado para usar PostgreSQL com Drizzle ORM:

1. Configure a variável `DATABASE_URL`
2. Execute as migrações: `npm run db:push`
3. Substitua `MemStorage` por `DbStorage` em `server/routes.ts`

## 📝 Como Funciona

### WebSocket
- Conexão estabelecida em `/ws`
- Mensagens enviadas em tempo real para todos os clientes conectados
- Reconexão automática em caso de falha

### Fluxo de Mensagens
1. Usuário digita nome e entra no chat
2. Mensagem é enviada via WebSocket
3. Servidor valida e armazena a mensagem
4. Mensagem é transmitida para todos os clientes conectados
5. Interface atualizada instantaneamente

## 🤝 Contribuições

Respeitando a licença de uso restrito, você pode:
- Fazer fork para fins de estudo
- Abrir issues para bugs ou sugestões
- Personalizar para projetos pessoais não-comerciais
- Usar como referência em projetos educacionais

## 📄 Licença

Este projeto possui **Licença de Uso Restrito para Avaliação e Estudo**.

**Você PODE:**
- Usar para fins educacionais e estudo
- Usar em projetos pessoais não-comerciais  
- Incluir no seu portfolio
- Fazer avaliações técnicas

**Você NÃO PODE:**
- Usar comercialmente sem autorização
- Vender ou distribuir comercialmente
- Remover os avisos de copyright

Para uso comercial, entre em contato com o autor original.
Veja o arquivo `LICENSE` para detalhes completos.

---

Desenvolvido com ❤️ usando React, Express.js e WebSockets.