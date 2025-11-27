import { cookies } from 'next/headers';

export async function getSources() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  const res = await fetch(`${process.env.API_URL}/sources`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) return null;

  return res.json();
}
