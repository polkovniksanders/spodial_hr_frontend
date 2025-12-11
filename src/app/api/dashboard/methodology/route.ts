import { NextResponse } from 'next/server';

import { getAuthHeaders } from '@/shared/lib/getAuthToken';

export async function POST(req: Request) {
  const authHeaders = await getAuthHeaders();

  try {
    const body = await req.json();

    const response = await fetch(process.env.API_URL + '/methodologies', {
      method: 'POST',
      headers: {
        ...authHeaders,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.message || 'Server error' },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy Route Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
