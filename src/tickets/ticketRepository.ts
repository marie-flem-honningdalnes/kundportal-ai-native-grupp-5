import { desc, eq } from "drizzle-orm";
import type { Db } from "@/db/client";
import { tickets, type Ticket } from "@/db/schema";
import type { NewTicket } from "./ticketSchema";

export async function createTicket(db: Db, customerId: number, input: NewTicket): Promise<Ticket> {
  const [ticket] = await db
    .insert(tickets)
    .values({ customerId, ...input })
    .returning();
  return ticket!;
}

export function listTicketsForCustomer(db: Db, customerId: number): Promise<Ticket[]> {
  return db
    .select()
    .from(tickets)
    .where(eq(tickets.customerId, customerId))
    .orderBy(desc(tickets.createdAt), desc(tickets.id));
}
