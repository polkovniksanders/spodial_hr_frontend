import { getAuthHeaders } from '@/shared/lib/getAuthToken';

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
    return null;
  }

  return res.json();
}
