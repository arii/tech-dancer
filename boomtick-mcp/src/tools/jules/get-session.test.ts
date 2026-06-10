import { describe, it, expect, vi } from "vitest";
import { getJulesSessionHandler } from "./get-session.js";
import fetch from "node-fetch";

vi.mock("node-fetch");

describe("getJulesSessionHandler", () => {
  it("should get session with recent message", async () => {
    (fetch as any).mockImplementation((url: string) => {
      if (url.endsWith("/messages")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ messages: [{ content: "Latest Jules reply" }] })
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: "session-1", state: "COMPLETED" })
      });
    });

    const result = await getJulesSessionHandler({ id: "session-1", apiKey: "test" });
    expect(result.id).toBe("session-1");
    expect(result.status).toBe("COMPLETED");
    expect(result.recentMessage).toBe("Latest Jules reply");
  });
});
