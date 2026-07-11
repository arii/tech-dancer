import type { VercelRequest, VercelResponse } from "@vercel/node";

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const cache = new Map<string, RateLimitRecord>();

// Clean up expired records periodically
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now > value.resetTime) {
      cache.delete(key);
    }
  }
}, 5 * 60 * 1000);

if (cleanupTimer && typeof cleanupTimer.unref === 'function') {
  cleanupTimer.unref();
}

export function rateLimiter(req: VercelRequest, res: VercelResponse): boolean {
  // Extract client IP address safely
  const forwardedFor = req.headers["x-forwarded-for"];
  const realIp = req.headers["x-real-ip"];
  const ip = String(
    (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor) ||
    (Array.isArray(realIp) ? realIp[0] : realIp) ||
    req.socket.remoteAddress ||
    "unknown"
  ).split(",")[0].trim();

  const now = Date.now();
  const record = cache.get(ip);

  if (!record || now > record.resetTime) {
    cache.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    res.setHeader("X-RateLimit-Limit", MAX_REQUESTS);
    res.setHeader("X-RateLimit-Remaining", MAX_REQUESTS - 1);
    res.setHeader("X-RateLimit-Reset", Math.ceil((now + WINDOW_MS) / 1000));
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    res.setHeader("X-RateLimit-Limit", MAX_REQUESTS);
    res.setHeader("X-RateLimit-Remaining", 0);
    res.setHeader("X-RateLimit-Reset", Math.ceil(record.resetTime / 1000));
    res.status(429).json({ error: "Too many requests, please try again later." });
    return false;
  }

  record.count += 1;
  res.setHeader("X-RateLimit-Limit", MAX_REQUESTS);
  res.setHeader("X-RateLimit-Remaining", MAX_REQUESTS - record.count);
  res.setHeader("X-RateLimit-Reset", Math.ceil(record.resetTime / 1000));
  return true;
}
