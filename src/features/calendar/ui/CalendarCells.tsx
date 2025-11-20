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

export default function CalendarCells({ currentMonth, onCellClick }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = addDays(startOfWeek(monthStart, { weekStartsOn: 1 }), -7);
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const rows = [];
  let day = startDate;

  while (day <= endDate) {
    const rowIndex = rows.length;
    const week = [];

    const weeksCount = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / 86400000 / 7,
    );

    for (let i = 0; i < 7; i++) {
      const cloneDay = day;

      week.push(
        <div
          onClick={e => onCellClick(e, cloneDay)}
          key={cloneDay.toString()}
          className={`
              relative
              border-tertiary
              h-[110px] p-2
              ${!isSameMonth(cloneDay, monthStart) ? 'text-gray-300' : ''}
              ${isToday(cloneDay) ? 'bg-green-50 rounded' : ''}
              ${rowIndex === weeksCount - 1 ? 'border-b-0' : ''}     
              ${i === 0 ? 'border-l-0' : ''}
              ${i === 6 ? 'border-r-0' : ''}
            `}
        >
          <div className={'flex justify-center'}>
            <p className={'text-[15px]'}>{format(cloneDay, 'd')}</p>
          </div>
        </div>,
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div className='grid grid-cols-7' key={day.toString()}>
        {week}
      </div>,
    );
  }

  return <div>{rows}</div>;
}
