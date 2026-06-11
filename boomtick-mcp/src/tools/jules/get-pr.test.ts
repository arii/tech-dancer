import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getJulesPullRequestHandler } from "./get-pr.js";

describe("getJulesPullRequestHandler", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: "sessions/123",
            outputs: [
              {
                pullRequest: {
                  url: "https://github.com/arii/tech-dancer/pull/2027",
                },
              },
            ],
          }),
      })
    ) as any;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should get PR", async () => {
    const result = await getJulesPullRequestHandler({ id: "123" });
    expect(result.id).toBe("123");
    expect(result.pullRequestUrl).toBe("https://github.com/arii/tech-dancer/pull/2027");
  });
});
