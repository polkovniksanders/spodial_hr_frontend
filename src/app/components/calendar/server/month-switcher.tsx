import { addMonths, format, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { type SetStateAction } from 'react';

import { H2 } from '@/components/ui/typography/H2';

type MonthShiftFn = (date: Date, amount: number) => Date;

interface Props {
  currentMonth: Date;
  onMonthChange: React.Dispatch<SetStateAction<Date>>;
}

export const MonthSwitcher = ({ onMonthChange, currentMonth }: Props) => {
  const switchMonth = (cb: MonthShiftFn) => {
    onMonthChange(cb(currentMonth, 1));
  };

  const buttons = [
    {
      icon: ChevronLeft,
      callback: subMonths,
    },
    {
      icon: ChevronRight,
      callback: addMonths,
    },
  ];

  return (
    <div className={'flex flex-row justify-between px-[38px] py-[24px]'}>
      <div className='flex items-center gap-[11px]'>
        {buttons.map((button, index) => {
          const Icon = button.icon;
          return (
            <button
              className={'cursor-pointer'}
              key={index}
              onClick={() => switchMonth(button.callback)}
            >
              <Icon />
            </button>
          );
        })}
        <H2>{format(currentMonth, 'MMMM yyyy')}</H2>
      </div>
    </div>
  );
};
