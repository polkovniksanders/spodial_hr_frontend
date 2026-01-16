'use server';

import { revalidatePath } from 'next/cache';

import { getAuthHeaders } from '@/shared/lib/getAuthToken';

export async function switchBot(eventId: number, botRequired: boolean) {
  const authHeaders = await getAuthHeaders();

  const payload = {
    calendar_event_id: eventId,
    required_bot: botRequired,
  };

  const res = await fetch(
    `${process.env.API_URL}/calendar-events/${eventId}/bot/require`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        ...authHeaders,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error('Failed to require bot');
  }

  revalidatePath('/dashboard/calendar');

  return await res.json();
}
