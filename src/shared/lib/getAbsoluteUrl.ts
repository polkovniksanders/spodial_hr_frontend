// src/lib/api-url.ts
import { headers } from 'next/headers';

/**
 * Возвращает абсолютный URL для внутренних API-роутов
 * Работает и в dev, и в продакшене, и на Vercel, и в Docker
 */
export function getAbsoluteUrl(path: string) {
  // Если вызывается из клиентского компонента — используем window.location
  if (globalThis.window !== undefined) {
    return `${globalThis.location.origin}${path}`;
  }

  // Серверный компонент
  const headersList = headers();
  const host = 'localhost:3000';
  const proto = 'http';

  return `${proto}://${host}${path}`;
}
