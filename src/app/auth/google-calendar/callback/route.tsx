// app/auth/google-calendar/callback/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return new Response(`<script>window.close();</script>Error: ${error}`, {
      headers: { 'Content-Type': 'text/html' },
      status: 400,
    });
  }

  if (!code) {
    return new Response(`<script>window.close();</script>No code provided`, {
      headers: { 'Content-Type': 'text/html' },
      status: 400,
    });
  }

  try {
    // Тут твой код: обмен code на токены и сохранение в БД
    //await exchangeCodeForTokensAndSave(code, state);

    // Важно! Ревалидируем путь, чтобы при router.refresh() данные обновились
    //revalidatePath('/dashboard/calendar'); // или какой у тебя путь
    // Можно ревалидировать все, если не знаешь точный путь:
    revalidatePath('/', 'layout');

    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: "CALENDAR_CONNECTED",
                success: true 
              }, "${new URL(request.url).origin}");
            }
            window.close();
          </script>
          Календарь успешно подключён! Это окно закроется автоматически.
        </body>
      </html>
    `,
      {
        headers: { 'Content-Type': 'text/html' },
        status: 200,
      },
    );
  } catch (error_) {
    console.error('Google Calendar callback error:', error_);
    return new Response(
      `<script>window.close();</script>Ошибка при подключении календаря`,
      { headers: { 'Content-Type': 'text/html' }, status: 500 },
    );
  }
}

// Очень важно! Отключаем body-парсинг для OAuth-редиректа
export const dynamic = 'force-dynamic';
