'use client';

import { Circle, CircleCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

import { EventPopup } from '@/app/components/event/client/event-popup';
import { usePopup } from '@/shared/hooks/usePopup';
import { formatDate } from '@/shared/lib/dateFormatter';
import { isEventPast } from '@/shared/lib/isEventPast';
import { ROUTES } from '@/shared/lib/routes';

import type { EventProps } from '@/app/components/event/service/event.interface';

const Event = ({ event }: { event: EventProps }) => {
  const { id, title } = event;

  const isPast = isEventPast(event.ends_at);

  const router = useRouter();
  const { open, close } = usePopup();
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPast) {
      router.push(`${ROUTES.DASHBOARD.MEETING}/${id}?tab=summary`);
    } else {
      if (!anchorRef.current) {
        return;
      }

      open(anchorRef.current, {
        width: 600,
        preferredPosition: 'right',
        content: <EventPopup close={close} event={event} />,
      });
    }
  };

  return (
    <div
      ref={anchorRef}
      onClick={e => {
        handleClick(e);
        e.stopPropagation();
      }}
      className='flex flex-row items-center gap-2 rounded-full px-[10px] py-[6px] bg-primary text-white transition-colors cursor-pointer select-none'
    >
      <div className='flex flex-row items-center gap-2 flex-shrink-0'>
        {isPast ? <CircleCheckBig size={14} /> : <Circle size={14} />}
        {isPast && (
          <p className='text-xs line-through whitespace-nowrap'>
            {formatDate(event.starts_at)}
          </p>
        )}
      </div>
      <p className='text-xs truncate min-w-0'>{title}</p>
    </div>
  );
};

Event.displayName = 'CalendarEvent';

export default Event;
