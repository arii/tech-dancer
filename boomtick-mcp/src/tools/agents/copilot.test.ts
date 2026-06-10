import { describe, it, expect } from "vitest";
import { runAgentCopilotHandler } from "./copilot.js";

describe("runAgentCopilotHandler", () => {
  it("should return success response", async () => {
    const result = await runAgentCopilotHandler({ prompt: "hello" });
    expect(result.provider).toBe("copilot");
    expect(result.status).toBe("success");
    expect(result.response).toContain("hello");
  });
});
