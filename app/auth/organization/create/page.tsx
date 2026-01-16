import { AUTH_TITLE_VARIANT } from '@/features/auth/lib/options';
import AuthTitle from '@/features/auth/ui/auth-title';
import OrganizationForm from '@/features/organization/ui/organization-form';
import Card from '@/shared/ui/card/Card';

export default function Page() {
  return (
    <Card>
      <div className={'w-[690px] py-[100px] px-[72px]'}>
        <AuthTitle type={AUTH_TITLE_VARIANT.ORGANIZATION} />
        <OrganizationForm />
      </div>
    </Card>
  );
}
