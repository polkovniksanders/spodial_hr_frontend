import { Button } from '@/components/ui/button/Button';
import Link from 'next/link';
import { BUTTON_TEXT } from '@/features/auth/utils/options';

export default function RegisterButtons() {
  return (
    <div className={'flex flex-col gap-3'}>
      <Button>{BUTTON_TEXT.GET_STARTED}</Button>

      <Link href='sign-in'>
        <Button className={'w-full'} variant={'secondary'}>
          {BUTTON_TEXT.LOGIN}
        </Button>
      </Link>
    </div>
  );
}
