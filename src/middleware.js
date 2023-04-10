import { NextResponse } from 'next/server';

const skipRoutes = ['/auth/login', '/auth/register'];

export async function middleware(request) {
  const token = request.cookies.get('Token')?.value;
  console.log('Path: ' + request.nextUrl.pathname);

  if (
    !skipRoutes.includes(request.nextUrl.pathname) &&
    !token &&
    !request.nextUrl.pathname.startsWith('/_next/')
  ) return NextResponse.redirect(new URL('/auth/login', request.url));

  return NextResponse.next();
}
