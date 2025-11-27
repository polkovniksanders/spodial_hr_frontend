import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // 1. Создаем объект ответа, который будет содержать команду на удаление куки.
  const res = new NextResponse(null, { status: 200 });

  try {
    // 2. Асинхронно получаем хранилище куки и извлекаем токен.
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // Подготовка заголовков
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Если токен найден, добавляем заголовок Authorization
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // 3. Отправляем запрос на бэкенд для аннулирования токена.
    const backendRes = await fetch(process.env.API_URL + '/auth/logout', {
      method: 'POST',
      headers: headers, // Используем подготовленные заголовки
      // Тело запроса, скорее всего, не нужно, если используется только Bearer Token
    });

    // 4. Проверяем ответ от бэкенда (опционально)
    if (!backendRes.ok) {
      // Логируем, но продолжаем удалять куку на клиенте
      console.warn(
        `Backend reported error during logout (${backendRes.status}):`,
        await backendRes.text(),
      );
    }

    // 5. Очищаем куку 'token' в объекте ответа (res)
    // Это гарантирует, что браузер удалит куку.
    res.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Немедленно удаляет куку
    });

    // 6. Возвращаем ответ с очищенной кукой
    return res;
  } catch (err) {
    console.error('Logout error:', err);

    // В случае ошибки сети, всё равно очистим куку
    res.cookies.set('token', '', { maxAge: 0, path: '/' });

    return res;
  }
}
