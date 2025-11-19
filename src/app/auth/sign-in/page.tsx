import Card from '@/components/ui/card/Card';
import { H1 } from '@/components/ui/typography/H1';
import { Button } from '@/components/ui/button/Button';
import Link from 'next/link';

export default function Page() {
  return (
    <Card>
      <div className={'w-[546px] my-[100px] mx-[72px]'}>
        <div className={'flex justify-center mb-[70px]'}>
          <H1>Sign In</H1>
        </div>

        <div className={'flex flex-col gap-3'}>
          <Button>Log In</Button>

          <Link href='register'>
            <Button className={'w-full'} variant={'secondary'}>
              Register
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
