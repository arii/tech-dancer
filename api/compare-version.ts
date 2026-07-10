import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resolveLatest, compareVersions, checkNpmDeprecation, checkNodeEol, Ecosystem } from "./_lib/versions";
import { rateLimiter } from "./_lib/rate-limiter";

const VALID: Ecosystem[] = ["npm", "node", "gh-action"];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=3600");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (!rateLimiter(req, res)) return;
  if (req.method !== "GET") return res.status(405).json({ error: "GET only" });

  const ecosystem = String(req.query.ecosystem ?? "") as Ecosystem;
  const name = req.query.name ? String(req.query.name) : undefined;
  const candidate = req.query.candidate ? String(req.query.candidate) : undefined;

  if (!VALID.includes(ecosystem)) {
    return res.status(400).json({ error: `ecosystem must be one of: ${VALID.join(", ")}` });
  }
  if (!candidate) {
    return res.status(400).json({ error: "candidate is required, e.g. candidate=v4" });
  }
  if (ecosystem !== "node" && !name) {
    return res.status(400).json({ error: `name is required for ecosystem=${ecosystem}` });
  }

  const latest = await resolveLatest(ecosystem, name);
  if (latest === null) {
    return res.status(502).json({ error: "upstream lookup failed", ecosystem, name: name ?? null });
  }

  const cmp = compareVersions(candidate, latest);
  
  let isDeprecated: boolean | null = null;
  let isEOL: boolean | null = null;

  if (ecosystem === "npm" && name) {
    isDeprecated = await checkNpmDeprecation(name, candidate);
  } else if (ecosystem === "node") {
    isEOL = await checkNodeEol(candidate);
  }

  return res.status(200).json({
    ecosystem,
    name: name ?? "node",
    candidate,
    latest,
    isOutdated: cmp < 0,
    isCurrent: cmp === 0,
    isAheadOfLatest: cmp > 0,
    isDeprecated,
    isEOL,
    checkedAt: new Date().toISOString(),
  });
}
