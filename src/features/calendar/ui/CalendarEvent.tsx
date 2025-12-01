import { Circle, CircleCheckBig } from 'lucide-react';

import { formatDate } from '@/shared/lib/dateFormatter';
import { isEventPast } from '@/shared/lib/isEventPast';

import type { EventProps } from '@/features/calendar/service/event.interface';

interface Props {
  viewEvent: (currentEvent: EventProps) => void;
  open: (currentEvent: EventProps) => void;
  event: EventProps;
}

export default function CalendarEvent({ event, viewEvent, open }: Props) {
  const { id, title } = event;

  const isPast = isEventPast(event.ends_at);

  return (
    <div
      key={id}
      onClick={e => {
        isPast ? viewEvent(event) : open(e);
        e.stopPropagation();
      }}
      className='flex flex-row gap-2 truncate rounded-full px-[10px] py-[6px]  bg-primary text-white transition-colors cursor-pointer'
    >
      {isPast ? <CircleCheckBig size={14} /> : <Circle size={14} />}
      {isPast && (
        <div>
          <p className={'text-xs line-through'}>{formatDate(event.ends_at)}</p>
        </div>
      )}

      <p className={'text-xs'}>{title}</p>
    </div>
  );
}
