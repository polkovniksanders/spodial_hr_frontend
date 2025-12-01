'use client';

import { Circle, CircleCheckBig } from 'lucide-react'; // пример импорта
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

import { EventPopup } from '@/features/calendar/ui/EventPopup';
import { usePopup } from '@/shared/hooks/usePopup';
import { formatDate } from '@/shared/lib/dateFormatter';
import { isEventPast } from '@/shared/lib/isEventPast';

import type { EventProps } from '@/features/calendar/service/event.interface';

interface Props {
  event: EventProps;
}

const CalendarEvent = ({ event }: Props) => {
  const router = useRouter();
  const { id, title } = event;

  const { open, close } = usePopup();
  const anchorRef = useRef<HTMLDivElement>(null);
  const isPast = isEventPast(event.ends_at);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPast) {
      router.push(`/dashboard/meeting/${id}?tab=summary`);
    } else {
      if (!anchorRef.current) {
        console.warn('anchorRef.current is null!');
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
      key={id}
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
      <p className='text-xs'>{title}</p>
    </div>
  );
};

CalendarEvent.displayName = 'CalendarEvent';

export default CalendarEvent;
