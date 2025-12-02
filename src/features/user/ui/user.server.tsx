import { getUser } from '@/features/user/service/get-user';
import ErrorBanner from '@/features/user/ui/error-banner';
import UserClient from '@/features/user/ui/user.client';

export default async function UserServer() {
  const user = await getUser();

  if (!user) {
    return <ErrorBanner type='notFound' />;
  }

  return <UserClient {...user} />;
}
