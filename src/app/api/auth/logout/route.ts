import { NextResponse } from 'next/server';

import { getAuthHeaders } from '@/shared/lib/getAuthToken';

export async function POST() {
  const res = new NextResponse(null, { status: 200 });
  const authHeaders = await getAuthHeaders();

  try {
    const backendRes = await fetch(process.env.API_URL + '/auth/logout', {
      method: 'POST',
      headers: {
        ...authHeaders,
      },
    });

    if (!backendRes.ok) {
      console.warn(
        `Backend reported error during logout (${backendRes.status}):`,
        await backendRes.text(),
      );
    }

    res.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return res;
  } catch {
    res.cookies.set('token', '', { maxAge: 0, path: '/' });

    return res;
  }
}
