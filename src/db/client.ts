import { createClient } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

export type Db = LibSQLDatabase<typeof schema>;

export function createDb(url: string, authToken?: string): Db {
  return drizzle(createClient({ url, authToken: authToken || undefined }), { schema });
}

let db: Db | undefined;

/** The app's database, configured from DATABASE_URL (and DATABASE_AUTH_TOKEN for Turso). */
export function getDb(): Db {
  db ??= createDb(process.env.DATABASE_URL ?? "file:./data/dev.db", process.env.DATABASE_AUTH_TOKEN);
  return db;
}
