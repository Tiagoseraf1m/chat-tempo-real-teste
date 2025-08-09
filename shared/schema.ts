import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  role: text("role").notNull(), // 'user' or 'assistant'
  userId: varchar("user_id"),
  username: text("username"), // Nome do usuário para exibir no chat
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  isError: boolean("is_error").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  content: true,
  role: true,
  userId: true,
  username: true,
});

// Schema para entrada simples de mensagem de usuário
export const userMessageSchema = z.object({
  content: z.string().min(1).max(2000),
  username: z.string().min(1).max(50),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type UserMessage = z.infer<typeof userMessageSchema>;
