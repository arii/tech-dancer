import { describe, it, expect, vi } from "vitest";
import { findSimilarPrsHandler } from "./github.find_similar_prs.js";
import * as gh from "../lib/gh.js";

vi.mock("../lib/gh.js", () => ({
  listPrs: vi.fn()
}));

describe("github.find_similar_prs", () => {
  it("should find similar PRs based on shared files", async () => {
    const mockPrs = [
      {
        number: 1,
        title: "PR 1",
        author: { login: "user1" },
        url: "url1",
        files: [{ path: "file1.ts" }, { path: "file2.ts" }]
      },
      {
        number: 2,
        title: "PR 2",
        author: { login: "user2" },
        url: "url2",
        files: [{ path: "file2.ts" }, { path: "file3.ts" }]
      }
    ];

    vi.mocked(gh.listPrs).mockResolvedValue(mockPrs as any);

    const result = await findSimilarPrsHandler({ state: "open", maxResults: 10, minSharedFiles: 1 });

    expect(result.count).toBe(1);
    expect(result.similarPrs[0].pr1.number).toBe(1);
    expect(result.similarPrs[0].pr2.number).toBe(2);
    expect(result.similarPrs[0].sharedFiles).toEqual(["file2.ts"]);
  });
});
