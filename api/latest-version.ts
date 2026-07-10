import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resolveLatest, Ecosystem, MAX_PARAM_LENGTH } from "./_lib/versions.js";
import { rateLimiter } from "./_lib/rate-limiter.js";

const VALID: Ecosystem[] = ["npm", "node", "gh-action"];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  // Registry data doesn't change second-to-second — cache at the edge.
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=3600");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (!rateLimiter(req, res)) return;
  if (req.method !== "GET") return res.status(405).json({ error: "GET only" });

  const ecosystem = String(req.query.ecosystem ?? "") as Ecosystem;
  const name = req.query.name ? String(req.query.name) : undefined;

  if (!VALID.includes(ecosystem)) {
    return res.status(400).json({ error: `ecosystem must be one of: ${VALID.join(", ")}` });
  }
  if (name && name.length > MAX_PARAM_LENGTH) {
    return res.status(400).json({ error: `name must be ${MAX_PARAM_LENGTH} characters or fewer` });
  }
  if (ecosystem !== "node" && !name) {
    return res.status(400).json({ error: `name is required for ecosystem=${ecosystem}` });
  }

  const latest = await resolveLatest(ecosystem, name);
  if (latest === null) {
    return res.status(502).json({ error: "upstream lookup failed", ecosystem, name: name ?? null });
  }

  return res.status(200).json({
    ecosystem,
    name: name ?? "node",
    latest,
    checkedAt: new Date().toISOString(),
  });
}
