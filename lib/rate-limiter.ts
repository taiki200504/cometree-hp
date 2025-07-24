const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const WINDOW_SIZE_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // Max 10 requests per minute

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAfter: number } {
  const now = Date.now();
  let entry = rateLimitMap.get(ip);

  if (!entry || now - entry.lastReset > WINDOW_SIZE_MS) {
    // Reset or create new entry
    entry = { count: 0, lastReset: now };
    rateLimitMap.set(ip, entry);
  }

  entry.count++;

  const allowed = entry.count <= MAX_REQUESTS;
  const remaining = allowed ? MAX_REQUESTS - entry.count : 0;
  const resetAfter = WINDOW_SIZE_MS - (now - entry.lastReset);

  return { allowed, remaining, resetAfter };
}

// Optional: Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.lastReset > WINDOW_SIZE_MS * 2) { // Remove entries older than 2 windows
      rateLimitMap.delete(ip);
    }
  }
}, WINDOW_SIZE_MS); // Run cleanup every minute
