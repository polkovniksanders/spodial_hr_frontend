'use client';

import { useState } from 'react';

import Cells from '@/features/calendar/ui/cells';
import DayOfWeek from '@/features/calendar/ui/day-of-week';
import { MonthSwitcher } from '@/features/calendar/ui/month-switcher';

import type { EventProps } from '@/features/event/service/event.interface';

interface Props {
  events: EventProps[];
}

export default function CalendarClient({ events }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <>
      <MonthSwitcher
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />
      <DayOfWeek />
      <Cells events={events} currentMonth={currentMonth} />
    </>
  );
}
