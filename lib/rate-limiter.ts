const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const WINDOW_SIZE_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PUBLIC = 30; // Max 30 requests per minute for public routes
const MAX_REQUESTS_ADMIN = 100; // Max 100 requests per minute for admin routes

export function checkRateLimit(ip: string, isAdminRoute: boolean = false): { allowed: boolean; remaining: number; resetAfter: number } {
  const now = Date.now();
  const key = `${ip}:${isAdminRoute ? 'admin' : 'public'}`;
  let entry = rateLimitMap.get(key);

  const maxRequests = isAdminRoute ? MAX_REQUESTS_ADMIN : MAX_REQUESTS_PUBLIC;

  if (!entry || now - entry.lastReset > WINDOW_SIZE_MS) {
    // Reset or create new entry
    entry = { count: 0, lastReset: now };
    rateLimitMap.set(key, entry);
  }

  entry.count++;

  const allowed = entry.count <= maxRequests;
  const remaining = allowed ? maxRequests - entry.count : 0;
  const resetAfter = WINDOW_SIZE_MS - (now - entry.lastReset);

  return { allowed, remaining, resetAfter };
}

// Optional: Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now - entry.lastReset > WINDOW_SIZE_MS * 2) { // Remove entries older than 2 windows
      rateLimitMap.delete(key);
    }
  }
}, WINDOW_SIZE_MS); // Run cleanup every minute
