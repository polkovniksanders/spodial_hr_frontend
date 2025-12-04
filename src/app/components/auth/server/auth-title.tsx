import { AUTH_TITLE_VARIANT } from '@/app/components/auth/lib/options';
import { H1 } from '@/components/ui/typography/H1';

import type { AuthTitleVariant } from '@/app/components/auth/service/auth.interface';

export default function AuthTitle({ type }: { type: AuthTitleVariant }) {
  const titleVariant = {
    [AUTH_TITLE_VARIANT.SIGN_IN]: 'Sign In',
    [AUTH_TITLE_VARIANT.REGISTER]: 'Register',
  };

  return (
    <div className={'flex justify-center mb-[70px]'}>
      <H1>{titleVariant[type]}</H1>
    </div>
  );
}
