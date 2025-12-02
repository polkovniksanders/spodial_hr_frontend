// src/app/api/calendar/callback/route.ts  ← сюда Google вернёт после авторизации

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const CALLBACK_URL = '/dashboard/calendar';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    return NextResponse.redirect(
      new URL(`${CALLBACK_URL}?error=no_code`, request.url),
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // Обмениваем code на токены у твоего бэкенда
  const res = await fetch(`${process.env.API_URL}/google/oauth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({ code, state }),
  });

  if (!res.ok) {
    return NextResponse.redirect(
      new URL(`${CALLBACK_URL}?error=token_exchange`, request.url),
    );
  }

  // Успешно сохранили токены календаря
  const redirectUrl = new URL(CALLBACK_URL, request.url);
  redirectUrl.searchParams.set('attached', '1');

  return NextResponse.redirect(redirectUrl);
}
