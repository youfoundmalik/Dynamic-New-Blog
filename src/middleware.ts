import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is not for the base path
  if (request.nextUrl.pathname !== '/') {
    // Redirect to the base path
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Exclude API routes and static files
};