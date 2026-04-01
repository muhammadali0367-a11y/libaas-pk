import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const auth = request.cookies.get('admin_auth')?.value
    const validPassword = process.env.ADMIN_PASSWORD

    if (auth !== validPassword) {
      // If it's the login page itself, let it through
      if (pathname === '/admin/login') return NextResponse.next()
      // Otherwise redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
