import { describe, it, expect } from "vitest";
import { getJulesPullRequestHandler } from "./get-pr.js";

describe("getJulesPullRequestHandler", () => {
  it("should get PR", async () => {
    const result = await getJulesPullRequestHandler({ id: "1" });
    expect(result.id).toBe("1");
    expect(result.pullRequestUrl).toBe("https://github.com/example/repo/pull/1");
  });
});
