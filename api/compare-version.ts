import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resolveComparison } from "./_lib/versions.js";

import { prepareVersionGetRequest } from "./_lib/versionGetRequest.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const params = prepareVersionGetRequest(req, res, true);
  if (!params) return;
  const { ecosystem, name, candidate } = params;

  const comparison = await resolveComparison(ecosystem, candidate, name);
  if (comparison === null) {
    return res.status(502).json({ error: "upstream lookup failed", ecosystem, name: name ?? null });
  }

  return res.status(200).json({
    ...comparison,
    checkedAt: new Date().toISOString(),
  });
}
