import { Clock4, TextAlignJustify, Video } from 'lucide-react';

import type { EventProps } from '@/features/event/service/event.interface';

function formatDate(dateString: string) {
  const date = new Date(dateString.replace(' ', 'T'));
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export const items = [
  {
    Icon: Clock4,
    label: 'starts_at',
    value: (d: EventProps) => formatDate(d.starts_at),
  },
  {
    Icon: Video,
    label: 'url',
    value: (d: EventProps) => d.url,
  },
  {
    Icon: TextAlignJustify,
    label: 'title',
    value: (d: EventProps) => d.title,
  },
] as const;
