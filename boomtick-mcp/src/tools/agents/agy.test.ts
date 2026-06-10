import { describe, it, expect } from "vitest";
import { runAgentAgyHandler } from "./agy.js";

describe("runAgentAgyHandler", () => {
  it("should return success response", async () => {
    const result = await runAgentAgyHandler({ prompt: "hello" });
    expect(result.provider).toBe("agy");
    expect(result.status).toBe("success");
    expect(result.response).toContain("hello");
  });
});
