import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isDev=true;
  const cookieStore=await cookies()
  console.log('@cookieStore',cookieStore);
  const accessToken = cookieStore.get('access-token')?.value;
  const refreshToken = cookieStore.get('refresh-token')?.value;
  console.log('@accessToken',accessToken)
  console.log('@refreshToken',refreshToken)
  // if (isDev){
  //   return NextResponse.next();
  // }
  if (path.startsWith('/dashboard') || 
      path.startsWith('/products') || 
      path.startsWith('/workflows') || 
      path.startsWith('/messages') || 
      path.startsWith('/help') || 
      path.startsWith('/settings')) {
   
    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }
    
       return NextResponse.next();
  }
  
  // For non-protected routes, just pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard', '/dashboard/:path*',
    '/products', '/products/:path*',
    '/workflows', '/workflows/:path*',
    '/messages', '/messages/:path*',
    '/help', '/help/:path*',
    '/settings', '/settings/:path*'
  ],
};