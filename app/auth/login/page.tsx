import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AUTH_TITLE_VARIANT } from '@/features/auth/lib/options';
import AuthTitle from '@/features/auth/ui/auth-title';
import LoginForm from '@/features/auth/ui/login-form';
import { ROUTES } from '@/shared/lib/routes';
import Card from '@/shared/ui/card/Card';

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (token) redirect(`${ROUTES.DASHBOARD.CALENDAR}`);

  return (
    <Card>
      <div className='w-[690px] py-[100px] px-[72px]'>
        <AuthTitle type={AUTH_TITLE_VARIANT.SIGN_IN} />
        <LoginForm />
      </div>
    </Card>
  );
}
