import { cookies } from 'next/headers';

export function getTokenFromRequest() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value; // уже автоматически декодируется
  return token || null;
}
