import { cookies } from 'next/headers';

export async function getFollowUp(id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  console.log('id', id);

  const res = await fetch(`${process.env.API_URL}/followups/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('FollowUp fetch failed:', res.status, text);
    return null;
  }

  return res.json();
}

export async function getFollowUps(id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  console.log('id', id);
  console.log('eventId', id);

  const res = await fetch(
    `${process.env.API_URL}/calendar-events/${id}/followups?limit=50`,
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
    console.error('FollowUp fetch failed:', res.status, text);
    return null;
  }

  return res.json();
}
