import ErrorBanner from '@/app/components/user/client/error-banner';
import UserInfo from '@/app/components/user/client/user-info';
import { getUser } from '@/app/components/user/service/get-user';

export default async function User() {
  const user = await getUser();

  if (!user) {
    return <ErrorBanner type='notFound' />;
  }

  return <UserInfo {...user} />;
}
