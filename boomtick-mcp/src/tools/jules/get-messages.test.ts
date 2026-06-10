import { describe, it, expect } from "vitest";
import { getJulesMessagesHandler } from "./get-messages.js";

describe("getJulesMessagesHandler", () => {
  it("should return messages", async () => {
    const result = await getJulesMessagesHandler({ id: "1" });
    expect(result.id).toBe("1");
    expect(result.messages.length).toBeGreaterThan(0);
  });
});
