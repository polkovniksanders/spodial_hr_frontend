'use server';

import { cookies } from 'next/headers';

export async function attachCalendarActions() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(process.env.API_URL + '/google/oauth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to initiate Google OAuth: ${res.status} ${text}`);
  }

  const { data } = await res.json();
  return data.redirect as string;
}
