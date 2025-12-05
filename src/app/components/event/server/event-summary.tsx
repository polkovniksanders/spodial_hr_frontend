import { Fragment } from 'react';

import { items } from '@/app/components/event/lib/options';

import type { EventProps } from '@/app/components/event/service/event.interface';

export default function EventSummary({ data }: { data: EventProps }) {
  const iconClass = 'w-6 h-6 shrink-0';
  const textClass = 'font-normal text-[20px]';

  return (
    <Fragment>
      {items.map(({ Icon, value, label }) => (
        <div key={label} className='flex items-center gap-4'>
          <Icon className={iconClass} />
          <p className={textClass}>{value(data)}</p>
        </div>
      ))}
    </Fragment>
  );
}
