import type { VercelRequest, VercelResponse } from "@vercel/node";
import { rateLimiter } from "./_lib/rate-limiter";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (!rateLimiter(req, res)) return;

  return res.status(200).json({
    status: "ok",
    service: "VersionTruth",
    checkedAt: new Date().toISOString(),
  });
}
