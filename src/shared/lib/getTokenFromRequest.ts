import { cookies } from 'next/headers';

/**
 * Асинхронно получает значение 'token' из Cookies.
 * * @returns {Promise<string | null>} Значение токена или null, если токена нет.
 */
export async function getTokenFromRequest(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  return token || null;
}
