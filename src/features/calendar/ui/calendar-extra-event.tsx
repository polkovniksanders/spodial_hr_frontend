import React, { useRef } from 'react';

import { EventPopupAll } from '@/features/event/ui/event-popup-all';
import { usePopup } from '@/shared/hooks/usePopup';

import type { EventProps } from '@/features/event/service/event.interface';

export default function CalendarExtraEvent({
  count,
  dayEvents,
}: {
  count: number;
  dayEvents: EventProps[];
}) {
  const { open, close } = usePopup();

  const anchorRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    open(anchorRef.current, {
      width: 300,
      preferredPosition: 'bottom',
      content: <EventPopupAll list={dayEvents} close={close} />,
    });
  };

  return (
    <div
      ref={anchorRef}
      onClick={e => {
        handleClick(e);
        e.stopPropagation();
      }}
      className='cursor-pointer text-xs text-gray-500 text-center py-1'
    >
      +{count} more
    </div>
  );
}
