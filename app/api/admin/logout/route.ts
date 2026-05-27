import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const loginUrl = new URL('/admin/login', req.url)
  const response = NextResponse.redirect(loginUrl)
  response.cookies.set('admin_auth', '', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return response
}
