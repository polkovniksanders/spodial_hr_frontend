import Link from 'next/link';

import { MethodologiesAction } from '@/features/methodology/ui/methodologies-action';
import { ROUTES } from '@/shared/lib/routes';

import type { MethodologyProps } from '@/features/methodology/model/types';

export default function MethodologyItem({
  methodology,
}: {
  methodology: MethodologyProps;
}) {
  console.log('methodology', methodology);

  return (
    <div className='border-b border-neutral-200'>
      <div className='py-4 flex items-center justify-between group'>
        <Link
          className={'flex-1'}
          href={`${ROUTES.DASHBOARD.METHODOLOGY}/${methodology.id}`}
        >
          <h3 className='text-lg font-semibold text-accent'>
            {methodology.name}
          </h3>
        </Link>

        <MethodologiesAction methodology={methodology} />
      </div>
    </div>
  );
}
