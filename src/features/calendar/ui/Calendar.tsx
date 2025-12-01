'use client';

import { useState } from 'react';

import CalendarCells from '@/features/calendar/ui/CalendarCells';
import CalendarDays from '@/features/calendar/ui/CalendarDays';
import { CalendarMonth } from '@/features/calendar/ui/CalendarMonth';
import { CalendarPopup } from '@/features/calendar/ui/CalendarPopup';
import { usePopup } from '@/shared/hooks/usePopup';

import type { EventProps } from '@/features/calendar/service/event.interface';

interface Props {
  events: EventProps[];
}

export default function Calendar({ events }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { popupPos, openPopup, popupRef, closePopup, width } = usePopup();

  const onCellClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // openPopup(e, 292);
  };

  return (
    <>
      <CalendarMonth
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <CalendarDays />
      <CalendarCells
        events={events}
        onCellClick={onCellClick}
        currentMonth={currentMonth}
      />

      {popupPos && (
        <CalendarPopup
          width={width}
          ref={popupRef}
          onClose={closePopup}
          top={popupPos.top}
          left={popupPos.left}
        />
      )}
    </>
  );
}
