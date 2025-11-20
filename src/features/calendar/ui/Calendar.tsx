'use client';

import { useState } from 'react';
import CalendarPopup from '@/features/calendar/ui/CalendarPopup';
import { usePopup } from '@/shared/hooks/usePopup';
import { CalendarMonth } from '@/features/calendar/ui/CalendarMonth';
import CalendarDays from '@/features/calendar/ui/CalendarDays';
import CalendarCells from '@/features/calendar/ui/CalendarCells';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { popupPos, openPopup, popupRef, closePopup } = usePopup();

  const onCellClick = (e: MouseEvent, index: number) => {
    openPopup(e, index, 292);
  };

  return (
    <>
      <CalendarMonth
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      {/* <CalendarDays />*/}
      <CalendarCells onCellClick={onCellClick} currentMonth={currentMonth} />

      {popupPos && (
        <div ref={popupRef}>
          <CalendarPopup
            onClose={closePopup}
            top={popupPos.top}
            left={popupPos.left}
          />
        </div>
      )}
    </>
  );
}
