import { NextResponse } from 'next/server';
import { getTokenFromRequest } from '@/shared/utils/getTokenFromRequest';

export async function POST() {
  try {
    const token = getTokenFromRequest();

    if (!process.env.API_URL) {
      throw new Error('API_URL env variable is not defined');
    }

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const backendRes = await fetch(process.env.API_URL + '/google/oauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('backendRes', backendRes);

    const data = await backendRes.json();

    // 2. Обработка ошибки
    if (!backendRes.ok) {
      console.error('Backend Error:', data);
      return NextResponse.json(
        { error: data.message || 'Ошибка запуска OAuth' },
        { status: backendRes.status },
      );
    }

    // 3. Успешный ответ: бэкенд должен вернуть URL для редиректа на Google
    // Предполагаем, что бэкенд возвращает объект типа { redirectUrl: 'https://accounts.google.com/o/oauth2/...' }
    const { redirectUrl } = data;

    if (!redirectUrl) {
      console.error('Backend did not return redirect URL:', data);
      return NextResponse.json(
        { error: 'Бэкенд не вернул URL для редиректа' },
        { status: 500 },
      );
    }

    // 4. Возвращаем URL на фронтенд
    return NextResponse.json({ success: true, redirectUrl });
  } catch (err) {
    console.error('Proxy Route Error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
