'use client';

import { useState } from 'react';

import CalendarCells from '@/features/calendar/ui/CalendarCells';
import CalendarDays from '@/features/calendar/ui/CalendarDays';
import { CalendarMonth } from '@/features/calendar/ui/CalendarMonth';
import { EventPopup } from '@/features/calendar/ui/EventPopup';

import type { EventProps } from '@/features/calendar/service/event.interface';

interface Props {
  events: EventProps[];
}

export default function Calendar({ events }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
    </>
  );
}
