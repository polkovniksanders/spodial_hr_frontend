import Card from '@/components/ui/card/Card';
import AuthTitle from '@/features/auth/ui/AuthTitle';
import LoginForm from '@/features/auth/ui/LoginForm';
import { AUTH_TITLE_VARIANT } from '@/features/auth/utils/options';

export default function Page() {
  return (
    <Card>
      <div className={'w-[546px] my-[100px] mx-[72px]'}>
        <AuthTitle type={AUTH_TITLE_VARIANT.SIGN_IN} />
        <LoginForm />
      </div>
    </Card>
  );
}
