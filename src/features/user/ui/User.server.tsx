import Error from '@/components/ui/input/Error';
import { USER_ERRORS } from '@/features/user/lib/options';
import UserClient from '@/features/user/ui/User.client';
import { getUser } from '@/shared/lib/get-user';

function ErrorBanner({ type }: { type: keyof typeof USER_ERRORS }) {
  const { icon, message } = USER_ERRORS[type];
  return (
    <div className='flex justify-end mb-4 gap-2'>
      {icon}
      <Error>{message}</Error>
    </div>
  );
}

export default async function UserServer() {
  try {
    const user = await getUser();

    console.log('user', user);

    if (!user) return <ErrorBanner type='notFound' />;

    return <UserClient {...user} />;
  } catch {
    return <ErrorBanner type='server' />;
  }
}
