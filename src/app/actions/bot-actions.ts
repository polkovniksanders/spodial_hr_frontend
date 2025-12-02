'use server';

import { cookies } from 'next/headers';

export async function switchBot(eventId: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const payload = {
    calendar_event_id: eventId,
    required_bot: true,
  };

  const res = await fetch(
    `${process.env.API_URL}/calendar-events/${eventId}/bot/require`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error('Bot require failed:', res.status, text);
    throw new Error('Failed to require bot');
  }

  return await res.json();
}
