// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Db } from "@/db/client";
import { tickets } from "@/db/schema";
import { createTestDb, insertCustomer } from "@/test-utils/testDb";
import { submitTicket } from "./actions";

const mocks = vi.hoisted(() => ({
  db: undefined as unknown,
  customerId: 0,
  revalidatePath: vi.fn(),
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));
vi.mock("@/db/client", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/db/client")>()),
  getDb: () => mocks.db,
}));
vi.mock("@/lib/currentCustomer", () => ({ getCurrentCustomerId: async () => mocks.customerId }));

function formData(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

let db: Db;

beforeEach(async () => {
  vi.clearAllMocks();
  db = await createTestDb();
  mocks.db = db;
  mocks.customerId = (await insertCustomer(db)).id;
});

describe("submitTicket", () => {
  it("returns field errors and the submitted values when input is invalid, and saves nothing", async () => {
    const state = await submitTicket(undefined, formData({ subject: "", description: "Help", priority: "low" }));

    expect(state?.errors?.subject).toBeDefined();
    expect(state?.values).toEqual({ subject: "", description: "Help", priority: "low" });
    expect(await db.select().from(tickets)).toHaveLength(0);
    expect(mocks.redirect).not.toHaveBeenCalled();
  });

  it("saves a valid ticket for the current customer, revalidates the list and redirects to it", async () => {
    await expect(
      submitTicket(undefined, formData({ subject: "Broken invoice", description: "Totals are wrong", priority: "high" })),
    ).rejects.toThrow("NEXT_REDIRECT:/tickets");

    const saved = await db.select().from(tickets);
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({ customerId: mocks.customerId, subject: "Broken invoice", priority: "high", status: "open" });
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/tickets");
  });

  it("ignores a customerId or status sent in the form", async () => {
    const other = await insertCustomer(db);
    await expect(
      submitTicket(
        undefined,
        formData({ subject: "Spoof", description: "x", customerId: String(other.id), status: "closed" }),
      ),
    ).rejects.toThrow("NEXT_REDIRECT");

    const [saved] = await db.select().from(tickets);
    expect(saved).toMatchObject({ customerId: mocks.customerId, status: "open" });
  });
});
