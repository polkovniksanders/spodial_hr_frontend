import { CircleCheckBig } from 'lucide-react';

import type { EventProps } from '@/features/calendar/service/event.interface';

interface Props {
  viewEvent: (event: EventProps) => void;
  event: EventProps;
}
export default function CalendarEvent({ event, viewEvent }: Props) {
  const { id, title } = event;

  return (
    <div
      key={id}
      onClick={e => {
        viewEvent(event);
        e.stopPropagation();
        // onEventClick?.(event);
      }}
      className='flex flex-row gap-2 truncate rounded-full px-[10px] py-[6px]  bg-primary text-white transition-colors cursor-pointer'
    >
      <CircleCheckBig size={14} />

      <p className={'text-xs'}>{title}</p>
    </div>
  );
}
