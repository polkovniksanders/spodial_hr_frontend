'use client';

import { useEffect, useState } from 'react';
import { usePopup } from '@/shared/hooks/usePopup';
import { CalendarMonth } from '@/features/calendar/ui/CalendarMonth';
import CalendarCells from '@/features/calendar/ui/CalendarCells';
import CalendarDays from '@/features/calendar/ui/CalendarDays';
import { CalendarPopup } from '@/features/calendar/ui/CalendarPopup';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { popupPos, openPopup, popupRef, closePopup, width } = usePopup();

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch('/api/calendar/events', {
        method: 'GET',
        cache: 'no-store',
      });
    }

    fetchEvents();
  }, []);

  const onCellClick = (e: React.MouseEvent<HTMLDivElement>) => {
    openPopup(e, 292);
  };

  return (
    <>
      <CalendarMonth
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <CalendarDays />
      <CalendarCells onCellClick={onCellClick} currentMonth={currentMonth} />

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
