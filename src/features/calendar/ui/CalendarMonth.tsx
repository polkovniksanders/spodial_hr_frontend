import React from 'react';
import { H2 } from '@/components/ui/typography/H2';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, format, subMonths } from 'date-fns';

type MonthShiftFn = (date: Date, amount: number) => Date;

export const CalendarMonth = ({ setCurrentMonth, currentMonth }) => {
  const switchMonth = (cb: MonthShiftFn) => {
    setCurrentMonth(cb(currentMonth, 1));
  };

  return (
    <div className={'flex flex-row justify-between px-[38px] py-[24px]'}>
      <div className='flex items-center gap-[11px]'>
        <H2>{format(currentMonth, 'MMMM yyyy')}</H2>

        <button
          className={'cursor-pointer'}
          onClick={() => switchMonth(subMonths)}
        >
          <ChevronLeft />
        </button>
        <button
          className={'cursor-pointer'}
          onClick={() => switchMonth(addMonths)}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
