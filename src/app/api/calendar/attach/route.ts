import { NextResponse } from 'next/server';

import { getAuthHeaders } from '@/shared/lib/getAuthToken';

const CALLBACK_URL = '/dashboard/calendar';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const authHeaders = await getAuthHeaders();

  if (!code) {
    return NextResponse.redirect(
      new URL(`${CALLBACK_URL}?error=no_code`, request.url),
    );
  }

  const res = await fetch(`${process.env.API_URL}/google/oauth`, {
    method: 'POST',
    headers: {
      ...authHeaders,
    },
    body: JSON.stringify({ code, state }),
  });

  if (!res.ok) {
    return NextResponse.redirect(
      new URL(`${CALLBACK_URL}?error=token_exchange`, request.url),
    );
  }

  const redirectUrl = new URL(CALLBACK_URL, request.url);
  redirectUrl.searchParams.set('attached', '1');

  return NextResponse.redirect(redirectUrl);
}
