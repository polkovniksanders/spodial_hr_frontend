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
  let user: Awaited<ReturnType<typeof getUser>> | null = null;
  let errorType: keyof typeof USER_ERRORS | null = null;

  try {
    user = await getUser();
    if (!user) {
      errorType = 'notFound';
    }
  } catch {
    errorType = 'server';
  }

  if (errorType) {
    return <ErrorBanner type={errorType} />;
  }

  return <UserClient {...user!} />;
}
