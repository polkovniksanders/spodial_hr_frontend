import Card from '@/components/ui/card/Card';
import AuthTitle from '@/features/auth/ui/auth-title';
import RegisterForm from '@/features/auth/ui/register-form';
import { AUTH_TITLE_VARIANT } from '@/features/auth/utils/options';

export default function Page() {
  return (
    <Card>
      <div className={'w-[546px] my-[100px] mx-[72px]'}>
        <AuthTitle type={AUTH_TITLE_VARIANT.REGISTER} />
        <RegisterForm />
      </div>
    </Card>
  );
}
