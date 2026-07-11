import type { VercelRequest, VercelResponse } from "@vercel/node";
import { resolveLatest, compareVersions, checkNpmDeprecation, checkNodeEol, Ecosystem, MAX_PARAM_LENGTH } from "./_lib/versions.js";
import { rateLimiter } from "./_lib/rate-limiter.js";

const MAX_BATCH_SIZE = 25;

const VALID: Ecosystem[] = ["npm", "node", "gh-action"];

interface BatchItem {
  ecosystem: Ecosystem;
  name?: string;
  candidate: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (!rateLimiter(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const items = req.body as unknown;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "Body must be an array of query items" });
  }
  if (items.length > MAX_BATCH_SIZE) {
    return res.status(400).json({ error: `Batch size exceeds maximum of ${MAX_BATCH_SIZE} items` });
  }

  try {
    const results = await Promise.all(
      items.map(async (item: unknown) => {
        if (!item || typeof item !== "object") {
          return { error: "Item must be an object" };
        }
        const typedItem = item as Partial<BatchItem>;
        const ecosystem = typedItem.ecosystem;
        const name = typedItem.name;
        const candidate = typedItem.candidate;

        if (!ecosystem || !VALID.includes(ecosystem)) {
          return { error: `Invalid ecosystem. Must be one of: ${VALID.join(", ")}`, item };
        }
        if (!candidate) {
          return { error: "Missing candidate version", item };
        }
        if (candidate.length > MAX_PARAM_LENGTH) {
          return { error: `candidate must be ${MAX_PARAM_LENGTH} characters or fewer`, item };
        }
        if (name && name.length > MAX_PARAM_LENGTH) {
          return { error: `name must be ${MAX_PARAM_LENGTH} characters or fewer`, item };
        }
        if (ecosystem !== "node" && !name) {
          return { error: `Missing name for ecosystem=${ecosystem}`, item };
        }

        try {
          const latest = await resolveLatest(ecosystem, name);
          if (latest === null) {
            return { error: "Upstream lookup failed", ecosystem, name: name ?? null };
          }
          const cmp = compareVersions(candidate, latest);
          
          let isDeprecated: boolean | null = null;
          let isEOL: boolean | null = null;

          if (ecosystem === "npm" && name) {
            isDeprecated = await checkNpmDeprecation(name, candidate);
          } else if (ecosystem === "node") {
            isEOL = await checkNodeEol(candidate);
          }

          return {
            ecosystem,
            name: name ?? "node",
            candidate,
            latest,
            isOutdated: cmp < 0,
            isCurrent: cmp === 0,
            isAheadOfLatest: cmp > 0,
            isDeprecated,
            isEOL,
          };
        } catch {
          return { error: "Internal processing error", ecosystem, name: name ?? null };
        }
      })
    );

    return res.status(200).json(results);
  } catch {
    return res.status(500).json({ error: "Batch processing failed" });
  }
}
