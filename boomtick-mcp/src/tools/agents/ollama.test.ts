import { describe, it, expect } from "vitest";
import { runAgentOllamaHandler } from "./ollama.js";

describe("runAgentOllamaHandler", () => {
  it("should return success response", async () => {
    const result = await runAgentOllamaHandler({ prompt: "hello" });
    expect(result.provider).toBe("ollama");
    expect(result.status).toBe("success");
    expect(result.response).toContain("hello");
  });
});
