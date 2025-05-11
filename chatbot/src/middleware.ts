import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const cookieStore =await cookies();
  const accessToken = cookieStore.get('access-token')?.value;
  const refreshToken = cookieStore.get('refresh-token')?.value;

  // ✅ Redirect authenticated users away from /signin
  if (path === '/signin' && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // ✅ Redirect unauthenticated users away from protected routes
  const isProtectedRoute = [
    '/dashboard',
    '/products',
    '/workflows',
    '/messages',
    '/help',
    '/settings',
    '/user',
    '/ticket',
  ].some((protectedPath) => path.startsWith(protectedPath));

  if (isProtectedRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/signin',
    '/dashboard', '/dashboard/:path*',
    '/products', '/products/:path*',
    '/workflows', '/workflows/:path*',
    '/messages', '/messages/:path*',
    '/help', '/help/:path*',
    '/settings', '/settings/:path*',
    '/ticket', '/ticket/:path*',
    '/user', '/user/:path*',
  ],
};
