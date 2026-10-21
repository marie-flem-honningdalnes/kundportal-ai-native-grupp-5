import { getDb } from "./client";
import { customers, tickets } from "./schema";
import { DEMO_CUSTOMER_EMAIL } from "@/lib/currentCustomer";

const db = getDb();
const day = 24 * 60 * 60 * 1000;
const daysAgo = (n: number) => new Date(Date.now() - n * day);

const [demo] = await db
  .insert(customers)
  .values([
    { name: "Demo Customer", email: DEMO_CUSTOMER_EMAIL },
    { name: "Other Customer", email: "other@example.com" },
  ])
  .returning();

const other = await db.query.customers.findFirst({ where: (c, { eq }) => eq(c.email, "other@example.com") });

await db.insert(tickets).values([
  { customerId: demo!.id, subject: "Invoice shows the wrong VAT rate", description: "Invoice 2026-0912 uses 25% instead of 12%.", status: "open", priority: "high", createdAt: daysAgo(1) },
  { customerId: demo!.id, subject: "Change delivery address", description: "Please ship future orders to our new office.", status: "in_progress", priority: "normal", createdAt: daysAgo(4) },
  { customerId: demo!.id, subject: "Add a second user to our account", description: "Our accountant needs read access.", status: "closed", priority: "low", createdAt: daysAgo(12) },
  { customerId: other!.id, subject: "Another customer's ticket", description: "Must never be shown to the demo customer.", status: "open", priority: "normal", createdAt: daysAgo(2) },
]);

console.log("Seeded 2 customers and 4 tickets.");
