import { describe, it, expect } from "vitest";
import { sendJulesMessageHandler } from "./send-message.js";

describe("sendJulesMessageHandler", () => {
  it("should send a message", async () => {
    const result = await sendJulesMessageHandler({ id: "1", message: "hi" });
    expect(result.id).toBe("1");
    expect(result.status).toBe("success");
  });
});
