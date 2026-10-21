import { rmSync } from "node:fs";
import { execFileSync } from "node:child_process";

// Only local files can be reset; refuse to touch a remote (Turso) database.
const url = process.env.DATABASE_URL ?? "file:./data/dev.db";
if (!url.startsWith("file:")) {
  console.error(`db:reset only works on local file databases, not ${url.split("?")[0]}`);
  process.exit(1);
}

const path = url.slice("file:".length);
for (const suffix of ["", "-wal", "-shm", "-journal"]) rmSync(`${path}${suffix}`, { force: true });

const env = { ...process.env, DATABASE_URL: url };
execFileSync("npx", ["tsx", "src/db/migrate.mts"], { stdio: "inherit", env });
execFileSync("npx", ["tsx", "src/db/seed.mts"], { stdio: "inherit", env });
