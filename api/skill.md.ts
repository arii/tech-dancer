import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";
import { join } from "path";
import { rateLimiter } from "./_lib/rate-limiter.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Content-Type", "text/markdown; charset=utf-8");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (!rateLimiter(req, res)) return;

  try {
    const content = readFileSync(join(process.cwd(), "public", "skill.md"), "utf-8");
    return res.status(200).send(content);
  } catch {
    return res.status(500).json({ error: "Failed to read SKILL.md file" });
  }
}
