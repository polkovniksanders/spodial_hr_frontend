import { NextResponse } from 'next/server';

import type { RegisterResponse } from '@/app/components/auth/service/auth.interface';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 0. Проверяем наличие переменной
    if (!process.env.API_URL) {
      throw new Error('API_URL env variable is not defined');
    }

    // 1. Отправляем запрос на внешний бэкенд
    const backendRes = await fetch(process.env.API_URL + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    // 2. ВАЖНО: Проверяем, успешно ли ответил бэкенд
    // Если статус не 2xx, возвращаем ошибку на клиент
    if (!backendRes.ok) {
      console.error('Backend Error:', data);
      return NextResponse.json(
        { error: data.message || 'Ошибка регистрации на сервере' },
        { status: backendRes.status },
      );
    }

    // 3. Если всё хорошо, создаем успешный ответ
    const res = NextResponse.json({ success: true, user: data });

    // 4. Устанавливаем токен в куки
    // Проверяем, что токен действительно пришел
    if (data.token) {
      res.cookies.set('token', data.token, {
        httpOnly: true, // Недоступно через JS в браузере (защита от XSS)
        secure: process.env.NODE_ENV === 'production', // Только HTTPS в проде
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // Например, 7 дней (настрой под себя)
      });
    }

    return res;
  } catch (error) {
    console.error('Proxy Route Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
