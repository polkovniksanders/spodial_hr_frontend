'use server';

import { cookies } from 'next/headers';

export async function setIdCookie(key: string, value: string) {
  const store = await cookies();
  store.set({
    name: key,
    value,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

/*
export default function Page() {
  const id = cookies().get('methodologyId')?.value;

  return <div>ID: {id}</div>;
}*/
