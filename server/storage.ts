import { type User, type InsertUser, type Message, type InsertMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesByUserId(userId: string): Promise<Message[]>;
  getAllMessages(): Promise<Message[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private messages: Map<string, Message>;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      timestamp: new Date(),
      isError: false,
      userId: insertMessage.userId || null,
    };
    this.messages.set(id, message);
    return message;
  }

  async getMessagesByUserId(userId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter((message) => message.userId === userId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values())
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
}

export const storage = new MemStorage();
