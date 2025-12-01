import { Fragment } from 'react';

import { items } from '@/features/event/lib/options';

import type { EventProps } from '@/features/calendar/service/event.interface';

export default function EventSummary({ data }: { data: EventProps }) {
  const iconClass = 'w-6 h-6 text-gray-600 shrink-0';
  const textClass = 'font-normal text-[20px] text-gray-900';

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
