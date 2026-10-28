// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Db } from "@/db/client";
import { tickets } from "@/db/schema";
import { createTestDb } from "@/test-utils/testDb";
import { submitTicket } from "./actions";

const mocks = vi.hoisted(() => ({
  db: undefined as unknown,
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
});

describe("submitTicket", () => {
  it("returns field errors and the submitted values when input is invalid, and saves nothing", async () => {
    const state = await submitTicket(undefined, formData({ requesterName: "Ada", subject: "", description: "Help", priority: "low" }));

    expect(state?.errors?.subject).toBeDefined();
    expect(state?.values).toEqual({
      requesterName: "Ada",
      requesterEmail: "",
      subject: "",
      description: "Help",
      priority: "low",
    });
    expect(await db.select().from(tickets)).toHaveLength(0);
    expect(mocks.redirect).not.toHaveBeenCalled();
  });

  it("saves a valid ticket with its requester, revalidates the list and redirects to it", async () => {
    await expect(
      submitTicket(undefined, formData({
        requesterName: "Ada Lovelace",
        requesterEmail: "ada@example.com",
        subject: "Broken invoice",
        description: "Totals are wrong",
        priority: "high",
      })),
    ).rejects.toThrow("NEXT_REDIRECT:/tickets");

    const saved = await db.select().from(tickets);
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({
      requesterName: "Ada Lovelace",
      requesterEmail: "ada@example.com",
      subject: "Broken invoice",
      priority: "high",
      status: "open",
    });
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/tickets");
  });

  it("returns an error for an invalid requester email and saves nothing", async () => {
    const state = await submitTicket(
      undefined,
      formData({ requesterName: "Ada", requesterEmail: "not-an-email", subject: "Hello", description: "Body" }),
    );

    expect(state?.errors?.requesterEmail).toBeDefined();
    expect(await db.select().from(tickets)).toHaveLength(0);
  });

  it("saves a ticket without a requester email", async () => {
    await expect(
      submitTicket(undefined, formData({ requesterName: "Grace", subject: "Phone call", description: "Invoice query" })),
    ).rejects.toThrow("NEXT_REDIRECT");

    const [saved] = await db.select().from(tickets);
    expect(saved).toMatchObject({ requesterName: "Grace", requesterEmail: null });
  });

  it("ignores a status sent in the form", async () => {
    await expect(
      submitTicket(undefined, formData({ requesterName: "Ada", subject: "Spoof", description: "x", status: "closed" })),
    ).rejects.toThrow("NEXT_REDIRECT");

    const [saved] = await db.select().from(tickets);
    expect(saved).toMatchObject({ status: "open" });
  });
});
