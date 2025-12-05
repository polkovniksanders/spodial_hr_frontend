import RegisterForm from '@/app/components/auth/client/register-form';
import { AUTH_TITLE_VARIANT } from '@/app/components/auth/lib/options';
import AuthTitle from '@/app/components/auth/server/auth-title';
import Card from '@/components/ui/card/Card';

export default function Page() {
  return (
    <Card>
      <div className={'w-[690px] py-[100px] px-[72px]'}>
        <AuthTitle type={AUTH_TITLE_VARIANT.REGISTER} />
        <RegisterForm />
      </div>
    </Card>
  );
}
