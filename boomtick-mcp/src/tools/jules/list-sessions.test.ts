import { describe, it, expect, vi } from "vitest";
import { listJulesSessionsHandler } from "./list-sessions.js";

vi.mock("node-fetch", () => ({
  default: vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({
      sessions: [
        { name: "session-1", state: "COMPLETED" },
        { name: "session-2", state: "PENDING" }
      ]
    })
  })
}));

describe("listJulesSessionsHandler", () => {
  it("should list sessions", async () => {
    const result = await listJulesSessionsHandler({ apiKey: "test" });
    expect(result.length).toBe(2);
    expect(result[0].id).toBe("session-1");
  });
});
