'use client';

import { useState } from 'react';

import Cells from '@/app/components/calendar/server/cells';
import DayOfWeek from '@/app/components/calendar/server/day-of-week';
import { MonthSwitcher } from '@/app/components/calendar/server/month-switcher';
import ComponentHeader from '@/components/ui/layout/component-header';

import type { EventProps } from '@/app/components/event/service/event.interface';

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
