import { WEEK_DAYS } from '@/features/calendar/lib/options';

export default function DayOfWeek() {
  return (
    <div className='grid grid-cols-7 text-center text-xs font-medium text-gray-500'>
      {WEEK_DAYS.map(day => (
        <div key={day} className='py-3'>
          {day}
        </div>
      ))}
    </div>
  );
}
