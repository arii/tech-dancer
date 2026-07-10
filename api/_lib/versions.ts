// Ported from dev_tools/version_utils.py — kept dependency-free (no `semver`)
// so it stays consistent with the Python implementation that already gates CI.

export type Ecosystem = "npm" | "node" | "gh-action";

interface NpmLatestResponse {
  version?: string;
}

interface NodeDistItem {
  version?: string;
}

interface GithubReleaseResponse {
  tag_name?: string;
}

interface NpmVersionResponse {
  deprecated?: string;
}

interface NodeEolCycle {
  cycle: string;
  eol: string;
}

export const GH_REPO_PATTERN = /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/;

/** Maximum length for any version or name parameter before parsing. */
export const MAX_PARAM_LENGTH = 64;

export async function fetchLatestNpm(pkgName: string): Promise<string | null> {
  try {
    const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkgName)}/latest`);
    if (!res.ok) {
      console.error("Failed to fetch npm latest version. Package:", pkgName, "Status:", res.status);
      return null;
    }
    const data = (await res.json()) as NpmLatestResponse;
    return data.version ?? null;
  } catch (error) {
    console.error("Error fetching npm latest version:", pkgName, error instanceof Error ? error.message : error);
    return null;
  }
}

export async function fetchLatestNode(): Promise<string | null> {
  try {
    const res = await fetch("https://nodejs.org/dist/index.json");
    if (!res.ok) {
      console.error(`Failed to fetch Node releases. Status: ${res.status}`);
      return null;
    }
    const data = (await res.json()) as NodeDistItem[];
    const first = Array.isArray(data) ? data[0] : null;
    return first?.version ? String(first.version).replace(/^v/, "") : null;
  } catch (error) {
    console.error("Error fetching Node latest version:", error instanceof Error ? error.message : error);
    return null;
  }
}

export async function fetchLatestGhAction(repoPath: string): Promise<string | null> {
  if (!GH_REPO_PATTERN.test(repoPath)) {
    console.error("Invalid GitHub repository path format:", repoPath);
    return null;
  }

  const [owner, repo] = repoPath.split('/');
  try {
    const headers: Record<string, string> = { "User-Agent": "boomtick-version-skill" };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }
    const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases/latest`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.error("Failed to fetch GitHub release. Repo:", `${owner}/${repo}`, "Status:", res.status);
      return null;
    }
    const data = (await res.json()) as GithubReleaseResponse;
    return data.tag_name ?? null;
  } catch (error) {
    console.error("Error fetching GitHub release:", `${owner}/${repo}`, error instanceof Error ? error.message : error);
    return null;
  }
}

/** Normalizes "v4", "24.x", "1.2.3" into a comparable number array. */
function normalize(v: string): number[] {
  const trimmed = v.trim();
  if (trimmed.length > MAX_PARAM_LENGTH) return [0];

  const clean = trimmed.replace(/^v/i, "").replace(/\.x$/i, ".0");
  return clean.split(".").map((part) => {
    let digitString = "";
    for (const char of part) {
      if (char >= "0" && char <= "9") {
        digitString += char;
      } else {
        break;
      }
    }
    const n = parseInt(digitString, 10);
    return Number.isNaN(n) ? 0 : n;
  });
}

/** Returns 1 if a > b, -1 if a < b, 0 if equal. Mirrors compare_versions() in version_utils.py. */
export function compareVersions(a: string, b: string): number {
  if (a === b) return 0;
  const pa = normalize(a);
  const pb = normalize(b);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const x = pa[i] ?? 0;
    const y = pb[i] ?? 0;
    if (x > y) return 1;
    if (x < y) return -1;
  }
  return 0;
}

export async function resolveLatest(ecosystem: Ecosystem, name?: string): Promise<string | null> {
  switch (ecosystem) {
    case "npm":
      return name ? fetchLatestNpm(name) : null;
    case "node":
      return fetchLatestNode();
    case "gh-action":
      return name ? fetchLatestGhAction(name) : null;
    default:
      return null;
  }
}

export async function checkNpmDeprecation(pkgName: string, version: string): Promise<boolean> {
  try {
    const cleanVersion = version.replace(/^v/i, "");
    const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkgName)}/${encodeURIComponent(cleanVersion)}`);
    if (!res.ok) {
      console.error("Failed to check npm deprecation. Package:", pkgName, "Version:", cleanVersion, "Status:", res.status);
      return false;
    }
    const data = (await res.json()) as NpmVersionResponse;
    return typeof data.deprecated === "string";
  } catch (error) {
    console.error("Error checking npm deprecation:", pkgName, version, error instanceof Error ? error.message : error);
    return false;
  }
}

export async function checkNodeEol(version: string): Promise<boolean> {
  try {
    const cleanVersion = version.replace(/^v/i, "");
    const major = cleanVersion.split(".")[0];
    if (!major) return false;

    const res = await fetch("https://endoflife.date/api/nodejs.json");
    if (!res.ok) {
      console.error(`Failed to fetch Node EOL dates. Status: ${res.status}`);
      const majorNum = parseInt(major, 10);
      if (Number.isNaN(majorNum)) return false;
      return majorNum <= 18 || majorNum === 19 || majorNum === 21;
    }
    const data = (await res.json()) as NodeEolCycle[];
    const match = data.find((item) => String(item.cycle) === major);
    if (!match) return false;

    const eolDate = new Date(match.eol);
    return eolDate < new Date();
  } catch (error) {
    console.error("Error checking Node EOL:", version, error instanceof Error ? error.message : error);
    const major = version.replace(/^v/i, "").split(".")[0];
    const majorNum = parseInt(major, 10);
    if (Number.isNaN(majorNum)) return false;
    return majorNum <= 18 || majorNum === 19 || majorNum === 21;
  }
}

export async function checkDeprecationOrEol(
  ecosystem: Ecosystem,
  name: string | undefined,
  candidate: string
): Promise<boolean> {
  if (ecosystem === "npm" && name) {
    return checkNpmDeprecation(name, candidate);
  }
  if (ecosystem === "node") {
    return checkNodeEol(candidate);
  }
  return false;
}
