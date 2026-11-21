import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resolveLatest } from "./_lib/versions.js";

import { prepareVersionGetRequest } from "./_lib/versionGetRequest.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const params = prepareVersionGetRequest(req, res);
  if (!params) return;
  const { ecosystem, name } = params;

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
