import { describe, it, expect, vi } from "vitest";
import { getJulesMessagesHandler } from "./get-messages.js";

vi.mock("node-fetch", () => ({
  default: vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({
      messages: [{ content: "msg1" }]
    })
  })
}));

describe("getJulesMessagesHandler", () => {
  it("should get messages", async () => {
    const result = await getJulesMessagesHandler({ id: "1", apiKey: "test" });
    expect(result.id).toBe("1");
    expect(result.messages.length).toBe(1);
    expect(result.messages[0].content).toBe("msg1");
  });
});
