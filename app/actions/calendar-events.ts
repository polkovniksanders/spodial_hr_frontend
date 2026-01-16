'use server';

import js from '@eslint/js';
import { revalidatePath } from 'next/cache';

import { getAuthHeaders } from '@/shared/lib/getAuthToken';

import type { EventProps } from '@/features/event/model/types';
import type { ApiResponse } from '@/shared/types/common';

export async function getSummary(id: string) {
  const authHeaders = await getAuthHeaders();

  const res = await fetch(`${process.env.API_URL}/calendar-events/${id}`, {
    method: 'GET',
    headers: {
      ...authHeaders,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Summary fetch failed:', res.status, text);
    return null;
  }

  return res.json();
}

export async function getEvents() {
  const authHeaders = await getAuthHeaders();

  const res = await fetch(`${process.env.API_URL}/calendar-events?limit=50`, {
    method: 'GET',
    headers: {
      ...authHeaders,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Events fetch failed:', res.status, text);
  }

  const json: ApiResponse<EventProps[]> = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error ?? 'Invalid API response');
  }

  console.log('json', json);

  return {
    data: json.data,
    status: json.status,
  };
}

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
