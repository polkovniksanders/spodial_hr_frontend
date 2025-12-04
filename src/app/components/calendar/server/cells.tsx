import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { Fragment, type JSX, useMemo } from 'react';

import Event from '@/app/components/calendar/client/event';
import EventExtraButton from '@/app/components/calendar/client/event-extra-button';
import Day from '@/app/components/calendar/server/day';

import type { EventProps } from '@/app/components/event/service/event.interface';

interface Props {
  currentMonth: Date;
  events: EventProps[];
}

export default function Cells({
  currentMonth,
  events = [],
}: Props): JSX.Element {
  const { startDate, endDate, weeksCount, monthStart } = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const daysDiff =
      Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1;
    const weeksCount = Math.ceil(daysDiff / 7);

    return { startDate, endDate, weeksCount, monthStart };
  }, [currentMonth]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventProps[]>();

    for (const ev of events) {
      const dateKey = ev.starts_at.split(' ')[0]; // "2025-12-15"
      if (!map.has(dateKey)) map.set(dateKey, []);
      map.get(dateKey)!.push(ev);
    }

    return map;
  }, [events]);

  const cells = useMemo(() => {
    const cells: JSX.Element[] = [];
    let day = new Date(startDate);

    while (day <= endDate) {
      const dateKey = format(day, 'yyyy-MM-dd');
      const dayEvents = eventsByDate.get(dateKey) || [];
      const isCurrentMonth = isSameMonth(day, monthStart);

      cells.push(
        <div
          key={day.toISOString()}
          className={`
            relative border border-gray-200 p-2 flex flex-col min-h-40
            ${isCurrentMonth ? 'bg-white' : 'bg-layout text-secondary'}
            ${day.getDay() === 1 ? 'border-l-0' : ''}
            ${day.getDay() === 0 ? 'border-r-0' : ''}
          `}
        >
          <Day currentDay={day} />
          <div className='flex-1 overflow-y-auto scrollbar-hide space-y-1'>
            {dayEvents.slice(0, 3).map(event => (
              <Fragment key={event.id}>
                <Event event={event} />
              </Fragment>
            ))}
            {dayEvents.length > 3 && (
              <EventExtraButton
                dayEvents={dayEvents}
                count={dayEvents.length - 3}
              />
            )}
          </div>
        </div>,
      );

      day = addDays(day, 1);
    }

    return cells;
  }, [startDate, endDate, monthStart, eventsByDate]);

  return (
    <div
      className='grid grid-cols-7 border-t border-l border-gray-200 h-full'
      style={{
        gridTemplateRows: `repeat(${weeksCount}, 1fr)`,
      }}
    >
      {cells}
    </div>
  );
}
