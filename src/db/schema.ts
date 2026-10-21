import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { ticketPriorities, ticketStatuses } from "@/tickets/ticketSchema";

const createdAt = () =>
  integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch('subsec') * 1000)`);

export const customers = sqliteTable("customers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: createdAt(),
});

export const tickets = sqliteTable(
  "tickets",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    customerId: integer("customer_id")
      .notNull()
      .references(() => customers.id, { onDelete: "cascade" }),
    subject: text("subject").notNull(),
    description: text("description").notNull(),
    status: text("status", { enum: ticketStatuses }).notNull().default("open"),
    priority: text("priority", { enum: ticketPriorities }).notNull().default("normal"),
    createdAt: createdAt(),
  },
  (table) => [index("tickets_customer_created_idx").on(table.customerId, table.createdAt)],
);

export type Customer = typeof customers.$inferSelect;
export type Ticket = typeof tickets.$inferSelect;
