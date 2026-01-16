import { getAuthHeaders } from '@/shared/lib/getAuthToken';

export async function meetingFollowUp(id: number) {
  const authHeaders = await getAuthHeaders();

  const res = await fetch(`${process.env.API_URL}/followups/${id}`, {
    method: 'GET',
    headers: {
      ...authHeaders,
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
  const authHeaders = await getAuthHeaders();

  const res = await fetch(
    `${process.env.API_URL}/calendar-events/${id}/followups?limit=50`,
    {
      method: 'GET',
      headers: {
        ...authHeaders,
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
