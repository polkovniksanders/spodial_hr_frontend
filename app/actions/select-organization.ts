'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function selectOrganizationAction(formData: FormData) {
  const id = formData.get('organization_id') as string;

  const store = await cookies();

  store.set({
    name: 'organization_id',
    value: id,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  redirect('/dashboard/calendar');
}
