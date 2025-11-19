import { H1 } from '@/components/ui/typography/H1';
import { Button } from '@/components/ui/button/Button';
import Card from '@/components/ui/card/Card';
import Link from 'next/link';

export default function Page() {
  return (
    <Card>
      <div className={'w-[546px] my-[100px] mx-[72px]'}>
        <div className={'flex justify-center mb-[70px]'}>
          <H1>Register</H1>
        </div>

        <div className={'flex flex-col gap-3'}>
          <Button>Get Started</Button>

          <Link href='sign-in'>
            <Button className={'w-full'} variant={'secondary'}>
              Login
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
