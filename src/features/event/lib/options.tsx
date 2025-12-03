import { parse, format } from 'date-fns';
import { Clock4, Dot, TextAlignJustify, Timer, Video } from 'lucide-react';

import type { EventProps } from '@/features/event/service/event.interface';

function formatDate(dateString: string) {
  console.log('dateString', dateString);

  const date = new Date(dateString.replace(' ', 'T'));
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

//Wednesday, December 3⋅2:00 – 3:00pm

function formatTime(dateString: string, withMeridiem: boolean): string {
  const date = parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
  return format(date, withMeridiem ? 'h:mmb' : 'h:mm');
}

export const items = [
  {
    Icon: Clock4,
    label: 'data',
    value: (d: EventProps) => (
      <div className={'flex flex-row items-center'}>
        {formatDate(d.starts_at)} <Dot /> {formatTime(d.starts_at, false)} –{' '}
        {formatTime(d.ends_at, true)}
      </div>
    ),
  },
  {
    Icon: Video,
    label: 'url',
    value: (d: EventProps) => d.url,
  },
  {
    Icon: TextAlignJustify,
    label: 'description',
    value: (d: EventProps) => d.description || 'This event has no description',
  },
] as const;
