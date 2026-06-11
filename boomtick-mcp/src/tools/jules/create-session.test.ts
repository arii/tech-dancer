import { describe, it, expect } from "vitest";
import { createJulesSessionHandler } from "./create-session.js";

describe("createJulesSessionHandler", () => {
  it("should create a session", async () => {
    const result = await createJulesSessionHandler({ task: "do work" });
    expect(result.id).toMatch(/^session-\d+$/);
    expect(result.status).toBe("PENDING");
    expect(result.createdAt).toBeInstanceOf(Date);
  });
});
