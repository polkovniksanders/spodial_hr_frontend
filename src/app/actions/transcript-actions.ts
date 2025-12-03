'use server';

import { cookies } from 'next/headers';

export async function loadTranscriptChunk(
  id: string,
  offset: number,
  limit: number,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(
    `${process.env.API_URL}/calendar-events/${id}/transcript?offset=${offset}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error('Transcript chunk fetch failed:', res.status, text);
    throw new Error('Failed to load transcript chunk');
  }

  const data = await res.json();
  const totalCount = Number(res.headers.get('Items-Count') || '0');

  return { data, totalCount, hasMore: offset + limit < totalCount };
}
