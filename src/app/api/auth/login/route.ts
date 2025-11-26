import { NextResponse } from 'next/server';
import type { RegisterResponse } from '@/features/auth/service/auth.interface';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    //sl@sl.sl
    //111111

    // 1. Отправляем запрос на внешний бэкенд
    const backendRes = await fetch(process.env.API_URL + '/auth/login', {
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

    console.log('data', data);

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
  } catch (err) {
    console.error('Proxy Route Error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

/*
export async function GET() {
  // 1. Проверяем токен
  const token = getTokenFromRequest();

  // 2. Если токена нет, возвращаем 401 Unauthorized
  if (!token) {
    return new NextResponse('Unauthorized: Missing Token', { status: 401 });
  }

  // 3. Если токен есть и он валиден, возвращаем данные (пример)
  try {
    // В реальном приложении здесь будет проверка токена на бэкенде или в DB
    // ...
    return NextResponse.json({ message: 'Секретные данные', userId: '123' });
  } catch (error) {
    return new NextResponse('Token validation failed', { status: 403 });
  }
}*/
