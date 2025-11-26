import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Сброс куки токена
    const response = NextResponse.json({ message: 'Logged out successfully' });

    console.log('response', response);

    const backendRes = await fetch(process.env.API_URL + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify(body),
    });

    console.log('backendRes', backendRes);

    response.cookies.set({
      name: 'token',
      value: '',
      path: '/',
      maxAge: 0,
      httpOnly: true,
    });

    return response;
  } catch (err) {
    console.error('Logout error:', err);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
