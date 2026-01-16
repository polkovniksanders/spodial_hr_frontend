'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { BUTTON } from '@/shared/lib/buttons';
import { ROUTES } from '@/shared/lib/routes';
import { Button } from '@/shared/ui/button/Button';

export default function MethodologyCreate() {
  const route = `${ROUTES.DASHBOARD.METHODOLOGY}/create`;

  return (
    <div className={'mt-auto w-[228px]'}>
      <Link href={route}>
        <Button loading={false} disabled={false} type='submit'>
          <Plus /> {BUTTON.ADD} methodology
        </Button>
      </Link>
    </div>
  );
}
