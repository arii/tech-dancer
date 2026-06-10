import { describe, it, expect, vi } from "vitest";
import { getJulesPullRequestHandler } from "./get-pr.js";

vi.mock("node-fetch", () => ({
  default: vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({
      name: "session-mocked",
      pullRequestUrl: "https://github.com/example/repo/pull/1"
    })
  })
}));

describe("getJulesPullRequestHandler", () => {
  it("should extract pullRequestUrl", async () => {
    const result = await getJulesPullRequestHandler({ id: "1", apiKey: "test" });
    expect(result.pullRequestUrl).toBe("https://github.com/example/repo/pull/1");
  });
});
