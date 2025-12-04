import { NextResponse } from 'next/server';

import { getAuthHeaders } from '@/shared/lib/getAuthToken';

export async function GET(request: Request) {
  const authHeaders = await getAuthHeaders();

  const res = await fetch(process.env.API_URL + '/calendar-events', {
    method: 'GET',
    cache: 'no-store',
    headers: {
      ...authHeaders,
    },
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
