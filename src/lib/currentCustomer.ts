import { eq } from "drizzle-orm";
import type { Db } from "@/db/client";
import { customers } from "@/db/schema";

export const DEMO_CUSTOMER_EMAIL = "demo@example.com";

/**
 * The signed-in customer's id.
 * Placeholder until authentication exists: always the seeded demo customer.
 * Replace this one function with a session lookup when auth is added.
 */
export async function getCurrentCustomerId(db: Db): Promise<number> {
  const customer = await db.query.customers.findFirst({ where: eq(customers.email, DEMO_CUSTOMER_EMAIL) });
  if (!customer) throw new Error("Demo customer not found. Run `npm run db:reset` to seed the database.");
  return customer.id;
}
