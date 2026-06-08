import { describe, it, expect, vi } from "vitest";
import { getPackageScriptsHandler } from "./repo.get_package_scripts.js";
import fs from "fs/promises";

vi.mock("fs/promises");

describe("repo.get_package_scripts", () => {
  it("should return scripts from package.json", async () => {
    const mockPkg = {
      scripts: { test: "vitest" }
    };

    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify(mockPkg));

    const result = await getPackageScriptsHandler();
    expect(result.scripts.test).toBe("vitest");
  });

  it("should handle missing scripts", async () => {
    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify({}));

    const result = await getPackageScriptsHandler();
    expect(result.scripts).toEqual({});
  });

  it("should throw error when file not found", async () => {
    vi.mocked(fs.readFile).mockRejectedValue(new Error("File not found"));

    await expect(getPackageScriptsHandler()).rejects.toThrow("Failed to read package.json: File not found");
  });
});
