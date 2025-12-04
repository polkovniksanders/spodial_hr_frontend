import { getAuthHeaders } from '@/shared/lib/getAuthToken';

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
