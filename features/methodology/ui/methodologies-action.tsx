'use client';

import { Pen, Trash } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/lib/routes';

import type { MethodologyProps } from '@/features/methodology/model/types';

export function MethodologiesAction({
  methodology,
}: {
  methodology: MethodologyProps;
}) {
  return (
    <div className='flex items-center gap-2'>
      <div className={'flex items-center justify-center'}>
        <Link href={`${ROUTES.DASHBOARD.METHODOLOGY}/${methodology.id}`}>
          <Pen className='size-[28] text-secondary' />
        </Link>
      </div>

      <div className={'flex items-center justify-center'}>
        <Trash className='size-[28] text-secondary hover:text-error transition-colors' />
      </div>
    </div>
  );
}
