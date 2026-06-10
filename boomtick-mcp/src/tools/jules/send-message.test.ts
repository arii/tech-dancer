import { describe, it, expect, vi } from "vitest";
import { sendJulesMessageHandler } from "./send-message.js";

vi.mock("node-fetch", () => ({
  default: vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({
      id: "msg-123"
    })
  })
}));

describe("sendJulesMessageHandler", () => {
  it("should send a message", async () => {
    const result = await sendJulesMessageHandler({ id: "session-1", message: "hello", apiKey: "test" });
    expect(result.success).toBe(true);
    expect(result.messageId).toBe("msg-123");
  });
});
