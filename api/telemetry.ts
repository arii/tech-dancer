import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
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

    // Log the structured telemetry to Vercel logs
    // We explicitly pick fields to prevent logging unexpected data
    console.error(JSON.stringify({
      telemetry: "frontend-error",
      message,
      type,
      url,
      timestamp,
      stack,
      componentStack,
      userAgent,
      receivedAt: new Date().toISOString(),
      clientIp: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    }));

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Telemetry ingestion failed:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
