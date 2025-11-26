// src/utils/auth.ts (Исправленная версия)
import { cookies } from 'next/headers';

/**
 * Асинхронно получает значение 'token' из Cookies.
 * * @returns {Promise<string | null>} Значение токена или null, если токена нет.
 */
export async function getTokenFromRequest(): Promise<string | null> {
  // 1. Используем await, чтобы дождаться получения хранилища куки
  const cookieStore = await cookies();

  // 2. Теперь cookieStore имеет правильный тип и метод .get() доступен
  const token = cookieStore.get('token')?.value;

  return token || null;
}
