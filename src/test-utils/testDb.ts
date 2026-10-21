import { migrate } from "drizzle-orm/libsql/migrator";
import { createDb, type Db } from "@/db/client";
import { customers } from "@/db/schema";

/** A fresh, migrated in-memory database. Create one per test so tests never share data. */
export async function createTestDb(): Promise<Db> {
  const db = createDb(":memory:");
  await migrate(db, { migrationsFolder: "./drizzle" });
  return db;
}

export async function insertCustomer(db: Db, overrides: Partial<typeof customers.$inferInsert> = {}) {
  const [customer] = await db
    .insert(customers)
    .values({ name: "Ada Lovelace", email: `ada+${crypto.randomUUID()}@example.com`, ...overrides })
    .returning();
  return customer!;
}
