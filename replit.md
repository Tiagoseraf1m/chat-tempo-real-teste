# Real-Time Multi-User Chat Application

## Overview

This is a modern real-time chat application built with React, Express.js, TypeScript, and WebSockets that enables multiple users to communicate instantly. The application features a clean, responsive chat interface where users can join with their names and chat with others in real-time. The system is designed as a full-stack web application with a React frontend, Express.js backend with WebSocket support, and uses in-memory storage with the option to scale to PostgreSQL using Drizzle ORM.

## Recent Changes (August 9, 2025)

- **Transformed from AI chat to real-time multi-user chat**: Replaced OpenAI integration with WebSocket-based real-time messaging
- **Added multi-user support**: Multiple users can now chat simultaneously with unique usernames
- **Implemented WebSocket communication**: Real-time bidirectional communication between clients and server
- **Created username modal**: Users enter their name before joining the chat
- **Enhanced message display**: Messages show sender names and timestamps, with visual distinction between own messages and others
- **Added connection status**: Real-time connection indicators in the header
- **Improved UX**: Auto-reconnection, better loading states, and responsive design

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Styling**: Tailwind CSS with custom design system variables
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with JSON communication
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Request Logging**: Custom middleware for API request/response logging
- **Development Tools**: Hot reload with Vite integration in development mode

### Data Storage Solutions
- **Current**: In-memory storage using Map data structures for messages and users
- **Planned**: PostgreSQL database with Drizzle ORM for production scaling
- **Schema**: Defined using Drizzle schema with Zod validation for type safety
- **Migrations**: Drizzle Kit for database schema management

### Authentication and Authorization
- **Current**: Guest user system with hardcoded user ID for demo purposes
- **Architecture**: Session-based authentication structure prepared for future implementation
- **Sessions**: Connect-pg-simple ready for PostgreSQL session storage

### Message Flow Architecture
- **User Input**: Text messages with character limits and validation
- **AI Processing**: OpenAI GPT-4o integration with system prompts for Portuguese responses
- **Real-time Updates**: Optimistic updates with React Query for smooth UX
- **Error Handling**: Graceful error display with toast notifications

### Component Architecture
- **Chat Interface**: Modular components (ChatHeader, ChatMessages, ChatInput, MessageBubble)
- **UI System**: Consistent design system with CSS custom properties
- **Responsive Design**: Mobile-first approach with proper viewport handling
- **Accessibility**: ARIA labels and semantic HTML structure

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4o model for conversational AI responses
- **Configuration**: Environment variable based API key management
- **Prompting**: System prompts configured for Brazilian Portuguese responses

### Database Services
- **Neon Database**: Serverless PostgreSQL for production deployment
- **Connection**: Environment-based database URL configuration
- **ORM**: Drizzle ORM with PostgreSQL dialect

### UI and Styling
- **Radix UI**: Comprehensive primitive component library for accessibility
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide Icons**: Icon library for consistent visual elements
- **Google Fonts**: Inter font family for typography

### Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast bundling for production builds
- **Replit Integration**: Development environment optimizations and error overlay

### State Management and HTTP
- **TanStack Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight routing solution
- **Fetch API**: Native HTTP client with custom wrapper for error handling

### Validation and Forms
- **Zod**: Schema validation for runtime type checking
- **React Hook Form**: Form state management with validation
- **Drizzle Zod**: Integration between Drizzle schema and Zod validation