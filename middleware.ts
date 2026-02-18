import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const DEBUG_ROUTES = [
  '/sentry-example-page',
  '/api/sentry-example-api',
]
const ADMIN_TEST_PATH = '/admin/test'

const REDIRECTS: Record<string, string> = {
  '/join/corporate': '/for-corporate',
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 301 リダイレクト
  if (pathname in REDIRECTS) {
    const url = request.nextUrl.clone()
    url.pathname = REDIRECTS[pathname]
    return NextResponse.redirect(url, 301)
  }

  if (process.env.NODE_ENV === 'production') {
    if (DEBUG_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/'))) {
      return new NextResponse(null, { status: 404 })
    }
    if (pathname === ADMIN_TEST_PATH || pathname.startsWith(ADMIN_TEST_PATH + '/')) {
      return new NextResponse(null, { status: 404 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/sentry-example-page',
    '/sentry-example-page/:path*',
    '/api/sentry-example-api',
    '/api/sentry-example-api/:path*',
    '/admin/test',
    '/admin/test/:path*',
    '/join/corporate',
  ],
}
