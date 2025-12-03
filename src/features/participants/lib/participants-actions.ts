'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function getAttendees(id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(
    `${process.env.API_URL}/calendar-events/${id}/participants`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error('Attendees fetch failed:', res.status, text);
    return null;
  }

  return res.json();
}

export async function getGuests(id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(
    `${process.env.API_URL}/calendar-events/${id}/profiles`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error('Guests fetch failed:', res.status, text);
    return null;
  }

  return res.json();
}

export async function setProfile(
  eventId: number,
  participantId: number,
  guestId: string | null,
) {
  'use server';

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new Error('Unauthorized');
  }

  const payload: any = {
    calendar_event_id: eventId,
    participant_id: participantId,
    profile_id: guestId,
  };

  const res = await fetch(
    `${process.env.API_URL}/calendar-events/${eventId}/participants/${participantId}/set-profile`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error('setProfile failed:', res.status, errorText);
    throw new Error('Не удалось сохранить сопоставление');
  }

  revalidatePath('/dashboard/meeting');

  return { success: true };
}
