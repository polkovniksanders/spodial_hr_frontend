import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useRouter } from 'next/navigation';
import { type JSX, useMemo } from 'react';
import { useSelector } from 'react-redux';

import CalendarEvent from '@/features/calendar/ui/CalendarEvent';
import { CalendarPopup } from '@/features/calendar/ui/CalendarPopup';
import { usePopup } from '@/shared/hooks/usePopup';

import type { EventProps } from '@/features/calendar/service/event.interface';
import type { RootState } from '@/store/store';

interface Props {
  currentMonth: Date;
  events: EventProps[];
  onCellClick: (e: React.MouseEvent<HTMLDivElement>, date: Date) => void;
  onEventClick?: (event: Event) => void; // опционально — клик по событию
}

export default function CalendarCells({
  currentMonth,
  events = [],
  onCellClick,
  onEventClick,
}: Props) {
  const router = useRouter();
  const { popupPos, openPopup, popupRef, closePopup, width } = usePopup();

  const viewEvent = (currentEvent: EventProps) => {
    console.log('currentEvent', currentEvent);
    router.push(`/dashboard/meeting/${currentEvent.id}?tab=summary`);
  };

  const open = e => {
    openPopup(e, 600);
  };

  const cardContent = useSelector(
    (state: RootState) => state.elementSizes.sizes['cardContent'],
  );
  const calendarMonth = useSelector(
    (state: RootState) => state.elementSizes.sizes['calendarMonth'],
  );

  const availableHeight = cardContent - calendarMonth;

  // ------------------- Подготовка дат и событий -------------------
  const { startDate, endDate, weeksCount, monthStart } = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const weeksCount = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (86_400_000 * 7),
    );

    return { startDate, endDate, weeksCount, monthStart };
  }, [currentMonth]);

  // Группируем события по дню (для быстрого поиска)
  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventProps[]>();

    console.log('events', events);

    for (const ev of events) {
      console.log('ev', ev);
      // Надёжный ручной парсинг без смещения часового пояса
      const [datePart, timePart] = ev.starts_at.split(' ');
      const [y, m, d] = datePart.split('-').map(Number);
      const [hh, mm, ss] = timePart.split(':').map(Number);

      const date = new Date(y, m - 1, d, hh, mm, ss);

      const key = format(date, 'yyyy-MM-dd');

      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    }

    return map;
  }, [events]);
  // ------------------- Генерация ячеек -------------------
  const rows = useMemo(() => {
    const rows: JSX.Element[] = [];
    let day = startDate;

    while (day <= endDate) {
      const week: JSX.Element[] = [];

      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(day);
        const dateKey = format(currentDay, 'yyyy-MM-dd');
        const dayEvents = eventsByDate.get(dateKey) || [];

        week.push(
          <div
            key={currentDay.toISOString()}
            onClick={e => onCellClick(e, currentDay)}
            className={`
              relative flex-1 border-table p-1 cursor-pointer
              ${isSameMonth(currentDay, monthStart) ? '' : 'text-gray-300'}
              ${i === 0 ? 'border-l-0' : ''}
              ${i === 6 ? 'border-r-0' : ''}
            `}
          >
            {/* Номер дня */}
            <div className='flex justify-center mb-1'>
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium
                  ${isToday(currentDay) ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              >
                {format(currentDay, 'd')}
              </div>
            </div>

            {/* События в этот день (показываем до 3–4, остальное — "+N") */}
            <div className='flex flex-col gap-[4px] overflow-hidden'>
              {dayEvents.map(event => (
                <CalendarEvent
                  key={event.id}
                  event={event}
                  open={open}
                  viewEvent={viewEvent}
                />
              ))}
              {dayEvents.length > 4 && (
                <div className='text-xs text-gray-500 text-center'>
                  +{dayEvents.length - 4}
                </div>
              )}
            </div>
          </div>,
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div
          key={day.toISOString()}
          style={{ height: availableHeight / weeksCount }}
          className='flex w-full'
        >
          {week}
        </div>,
      );
    }

    return rows;
  }, [
    startDate,
    endDate,
    weeksCount,
    availableHeight,
    monthStart,
    eventsByDate,
    onCellClick,
    onEventClick,
  ]);

  return (
    <>
      <div className='flex flex-col'>{rows}</div>

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
