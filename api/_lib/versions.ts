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

export async function fetchLatestNpm(pkgName: string): Promise<string | null> {
  try {
    const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkgName)}/latest`);
    if (!res.ok) return null;
    const data = (await res.json()) as NpmLatestResponse;
    return data.version ?? null;
  } catch {
    return null;
  }
}

export async function fetchLatestNode(): Promise<string | null> {
  try {
    const res = await fetch("https://nodejs.org/dist/index.json");
    if (!res.ok) return null;
    const data = (await res.json()) as NodeDistItem[];
    const first = Array.isArray(data) ? data[0] : null;
    return first?.version ? String(first.version).replace(/^v/, "") : null;
  } catch {
    return null;
  }
}

export async function fetchLatestGhAction(repoPath: string): Promise<string | null> {
  try {
    const headers: Record<string, string> = { "User-Agent": "boomtick-version-skill" };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }
    const res = await fetch(`https://api.github.com/repos/${repoPath}/releases/latest`, { headers });
    if (!res.ok) return null;
    const data = (await res.json()) as GithubReleaseResponse;
    return data.tag_name ?? null;
  } catch {
    return null;
  }
}

/** Normalizes "v4", "24.x", "1.2.3" into a comparable number array. */
function normalize(v: string): number[] {
  const clean = v.trim().replace(/^v/i, "").replace(/\.x$/i, ".0");
  return clean.split(".").map((part) => {
    const n = parseInt(part.replace(/[^\d].*$/, ""), 10);
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
    if (!res.ok) return false;
    const data = (await res.json()) as NpmVersionResponse;
    return typeof data.deprecated === "string";
  } catch {
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
      const majorNum = parseInt(major, 10);
      if (Number.isNaN(majorNum)) return false;
      return majorNum <= 18 || majorNum === 19 || majorNum === 21;
    }
    const data = (await res.json()) as NodeEolCycle[];
    const match = data.find((item) => String(item.cycle) === major);
    if (!match) return false;

    const eolDate = new Date(match.eol);
    return eolDate < new Date();
  } catch {
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
