import { getAuthHeaders } from '@/shared/lib/getAuthToken';

export async function getUser() {
  const authHeaders = await getAuthHeaders();

  const res = await fetch(process.env.API_URL + '/users/me', {
    method: 'GET',
    cache: 'force-cache',
    headers: {
      ...authHeaders,
    },
  });

  if (!res.ok) return null;

  return res.json();
}
