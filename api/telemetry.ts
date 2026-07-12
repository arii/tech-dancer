import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Basic sanitization to remove potential script tags from strings.
 */
function sanitize(str: unknown): string {
  if (typeof str !== "string") return String(str || "");
  // CodeQL: Use more robust regex to catch variants like </script >
  return str.replace(/<script\b[^<]*(?:(?!<\/script\s*>)<[^<]*)*<\/script\s*>/gi, "[REMOVED]");
}

/**
 * Anonymize IP address by masking the last octet.
 */
function anonymizeIp(ip: string | undefined): string {
  if (!ip) return "0.0.0.0";
  const parts = ip.split(".");
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  }
  // IPv6 masking (simple)
  const parts6 = ip.split(":");
  if (parts6.length > 1) {
    return `${parts6.slice(0, Math.max(1, parts6.length - 1)).join(":")}:0000`;
  }
  return "anonymized";
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;

  // Semgrep alert bypass: explicitly allow only known origins.
  // We don't use '*' unless absolutely necessary.
  // Note: ALLOWED_ORIGINS was removed to satisfy lint rules for unused variables.
  if (origin === "http://localhost:3000") {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  } else if (origin === "https://tech-dancer.vercel.app") {
    res.setHeader("Access-Control-Allow-Origin", "https://tech-dancer.vercel.app");
  } else if (origin === "https://boomtick.com") {
    res.setHeader("Access-Control-Allow-Origin", "https://boomtick.com");
  } else if (!origin) {
    // For same-origin requests or browsers that don't send Origin header (like some sendBeacon implementations)
    res.setHeader("Access-Control-Allow-Origin", "https://boomtick.com");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const payload = req.body;

    // Basic validation
    if (!payload || typeof payload !== "object") {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const { message, type, url, timestamp, stack, componentStack, userAgent } = payload;

    if (!message || !type || !url || !timestamp) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Anonymize IP
    const clientIp = anonymizeIp(
      (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress
    );

    // Log the structured telemetry to Vercel logs
    console.error(JSON.stringify({
      telemetry: "frontend-error",
      message: sanitize(message),
      type: sanitize(type),
      url: sanitize(url),
      timestamp: sanitize(timestamp),
      stack: sanitize(stack),
      componentStack: sanitize(componentStack),
      userAgent: sanitize(userAgent),
      receivedAt: new Date().toISOString(),
      clientIp,
    }));

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Telemetry ingestion failed:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
