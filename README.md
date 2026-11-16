# Chat em Tempo Real

Sistema de chat multiusuário desenvolvido com React, Express.js, TypeScript e WebSockets, permitindo a comunicação instantânea entre diferentes usuários por meio de uma interface web.

## ✨ Funcionalidades

- **Chat em tempo real:** envio e recebimento instantâneo de mensagens utilizando WebSockets.
- **Multiusuário:** permite que vários usuários participem simultaneamente da conversa.
- **Interface responsiva:** layout desenvolvido com Tailwind CSS.
- **Indicador de conexão:** exibe o status de conexão dos usuários.
- **Reconexão automática:** tenta restabelecer a conexão quando ocorre uma interrupção.
- **Identificação de mensagens:** diferencia as mensagens enviadas pelo próprio usuário das mensagens dos demais participantes.
- **Validação de dados:** utilização do Zod para validar os dados recebidos.

## 🚀 Tecnologias Utilizadas

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- TanStack Query
- Wouter
- Zod

### Backend
- Node.js
- Express.js
- TypeScript
- WebSocket (ws)
- Drizzle ORM

### Armazenamento
O projeto utiliza armazenamento em memória para gerenciar as mensagens. A estrutura também possui preparação para integração com PostgreSQL por meio do Drizzle ORM.

## 📁 Estrutura do Projeto

```text
├── client/
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── hooks/         # Hooks personalizados
│   │   ├── lib/           # Utilitários e configurações
│   │   └── pages/         # Páginas da aplicação
│   └── index.html
│
├── server/
│   ├── index.ts           # Inicialização do servidor
│   ├── routes.ts          # Rotas da API e WebSocket
│   ├── storage.ts         # Camada de armazenamento
│   └── vite.ts            # Configuração do Vite
│
├── shared/
│   └── schema.ts          # Schemas e tipos compartilhados
│
├── package.json
└── README.md
```

## ⚙️ Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Git instalado.

### 1. Clonar o repositório

```bash
git clone https://github.com/Tiagoseraf1m/chat-tempo-real-teste.git
```

### 2. Acessar a pasta do projeto

```bash
cd chat-tempo-real-teste
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar a aplicação

```bash
npm run dev
```

Após a inicialização, a aplicação estará disponível em:

```text
http://localhost:5000
```

## 🔄 Como funciona a comunicação em tempo real

A comunicação entre os usuários é realizada por meio de WebSockets, utilizando o servidor como intermediário.

### Fluxo de funcionamento

1. O usuário acessa a aplicação e informa seu nome.
2. Uma conexão WebSocket é estabelecida com o servidor.
3. O usuário envia uma mensagem pela interface.
4. O servidor recebe e valida os dados.
5. A mensagem é armazenada em memória.
6. O servidor transmite a mensagem aos usuários conectados.
7. As interfaces dos participantes são atualizadas em tempo real.

### Conexão WebSocket

O sistema utiliza o seguinte endpoint:

```text
/ws
```

## 🗄️ Banco de Dados

Atualmente, o sistema utiliza armazenamento em memória para gerenciar as mensagens.

O projeto possui estrutura preparada para uma futura integração com PostgreSQL utilizando Drizzle ORM.

A persistência em banco de dados poderá ser implementada em versões futuras.

## 📌 Observações

- As mensagens são armazenadas em memória e não possuem persistência após a reinicialização do servidor.
- O sistema utiliza WebSockets para comunicação instantânea entre os participantes.
- O projeto pode receber novas funcionalidades e melhorias em versões futuras.

## 📄 Licença

Este projeto está associado à licença MIT. Consulte o arquivo `LICENSE` para conhecer as condições de utilização, modificação e distribuição.
