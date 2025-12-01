import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!id) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  console.log(request);

  console.log('token', token);
  console.log('authHeader', authHeader);

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch(
      `${process.env.API_URL}/calendar-events/${id}/transcript`,
      {
        method: 'GET',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
        },
      },
    );

    // Самый правильный и надёжный прокси:
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: res.headers,
    });

    // Если всё-таки хочешь JSON-обработку (например, для логирования):
    // const cloned = res.clone();
    // let data;
    // try { data = await cloned.json(); } catch { data = null; }
    // return NextResponse.json(data ?? { error: 'Invalid response' }, { status: res.status });
  } catch (error) {
    console.error('Transcript proxy error [id:', id, ']:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
