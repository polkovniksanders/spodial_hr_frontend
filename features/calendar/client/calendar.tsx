'use client';

import { useState } from 'react';

import Cells from '@/features/calendar/server/cells';
import DayOfWeek from '@/features/calendar/server/day-of-week';
import { MonthSwitcher } from '@/features/calendar/server/month-switcher';
import ComponentHeader from '@/shared/ui/layout/component-header';

import type { EventProps } from '@/features/event/model/types';

export default function Calendar({ events }: { events: EventProps[] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <>
      <ComponentHeader>
        <MonthSwitcher
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />
      </ComponentHeader>

      <DayOfWeek />

      <div className='flex-1 flex flex-col'>
        <Cells events={events} currentMonth={currentMonth} />
      </div>
    </>
  );
}
