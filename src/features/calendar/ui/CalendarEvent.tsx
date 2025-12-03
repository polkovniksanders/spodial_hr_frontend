'use client';

import { Circle, CircleCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

import { EventPopup } from '@/features/event/ui/event-popup';
import { usePopup } from '@/shared/hooks/usePopup';
import { formatDate } from '@/shared/lib/dateFormatter';
import { isEventPast } from '@/shared/lib/isEventPast';
import { ROUTES } from '@/shared/lib/routes';

import type { EventProps } from '@/features/event/service/event.interface';

const CalendarEvent = ({ event }: { event: EventProps }) => {
  const { id, title } = event;

  const isPast = isEventPast(event.starts_at);

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
        preferredPosition: 'top',
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
      className='flex flex-row gap-2 truncate rounded-full px-[10px] py-[6px] bg-primary text-white transition-colors cursor-pointer'
    >
      {isPast ? <CircleCheckBig size={14} /> : <Circle size={14} />}
      {isPast && (
        <div>
          <p className='text-xs line-through'>{formatDate(event.ends_at)}</p>
        </div>
      )}
      <p className='text-xs truncate overflow-hidden text-ellipsis whitespace-nowrap'>
        {title}
      </p>
    </div>
  );
};

CalendarEvent.displayName = 'CalendarEvent';

export default CalendarEvent;
