import { cookies } from 'next/headers';

export async function getSummary(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(`${process.env.API_URL}/calendar-events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
