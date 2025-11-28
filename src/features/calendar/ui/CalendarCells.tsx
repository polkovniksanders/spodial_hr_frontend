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
import { useSelector } from 'react-redux';

import type { RootState } from '@/store/store';

interface Props {
  currentMonth: Date;
  onCellClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function CalendarCells({ currentMonth, onCellClick }: Props) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const cardContent = useSelector(
    (state: RootState) => state.elementSizes.sizes['cardContent'],
  );
  const calendarMonth = useSelector(
    (state: RootState) => state.elementSizes.sizes['calendarMonth'],
  );

  const availableHeight = cardContent - calendarMonth;

  const weeksCount = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / 86_400_000 / 7,
  );

  const rows = [];
  let day = startDate;

  while (day <= endDate) {
    const rowIndex = rows.length;
    const week = [];

    for (let i = 0; i < 7; i++) {
      const cloneDay = day;

      week.push(
        <div
          onClick={e => onCellClick(e)}
          key={cloneDay.toString()}
          className={`
              relative flex-1
              p-2
              border-table
              ${isSameMonth(cloneDay, monthStart) ? '' : 'text-gray-300'}
              ${rowIndex === weeksCount - 1 ? 'border-b-0' : ''}     
              ${i === 0 ? 'border-l-0 ' : 'border-b-0'}
              ${i === 6 ? 'border-r-0' : ' border-b-0'}
            `}
        >
          <div className={`flex justify-center`}>
            <div
              className={`flex justify-center p-1 ${isToday(cloneDay) ? 'bg-primary rounded-full text-white' : ''}`}
            >
              <p className={'text-[15px] font-normal'}>
                {format(cloneDay, 'd')}
              </p>
            </div>
          </div>
        </div>,
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div
        style={{
          height: availableHeight / weeksCount,
        }}
        className='flex w-full'
        key={day.toString()}
      >
        {week}
      </div>,
    );
  }

  return <div className='flex flex-col'>{rows}</div>;
}
