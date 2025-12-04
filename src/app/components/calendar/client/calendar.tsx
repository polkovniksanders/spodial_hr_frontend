'use client';

import { useState } from 'react';

import Cells from '@/app/components/calendar/server/cells';
import DayOfWeek from '@/app/components/calendar/server/day-of-week';
import { MonthSwitcher } from '@/app/components/calendar/server/month-switcher';

import type { EventProps } from '@/app/components/event/service/event.interface';

interface Props {
  events: EventProps[];
}

export default function Calendar({ events }: Props) {
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
