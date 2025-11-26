import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from '@/shared/utils/routes';

export function middleware(req: NextRequest) {
  // Берем cookie 'token' с HttpOnly cookie
  const token = req.cookies.get('token')?.value;

  if (!token) {
    const signInUrl = new URL(ROUTES.AUTH.LOGIN, req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Если токен есть, разрешаем доступ
  return NextResponse.next();
}

// Определяем маршруты, где нужно применить middleware
export const config = {
  matcher: ['/calendar/:path*'], // применяем ко всем страницам календаря
};
