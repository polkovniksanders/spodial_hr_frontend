import { Clock4, TextAlignJustify, Video } from 'lucide-react';

import type { SummaryProps } from '@/features/meeting/service/meeting.interface';

function formatDate(dateString: string) {
  const date = new Date(dateString.replace(' ', 'T'));
  // заменяем пробел на T, чтобы JS корректно понял ISO-формат
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
    value: (d: SummaryProps) => formatDate(d.starts_at),
  },
  {
    Icon: Video,
    label: 'url',
    value: (d: SummaryProps) => d.url,
  },
  {
    Icon: TextAlignJustify,
    label: 'title',
    value: (d: SummaryProps) => d.title,
  },
] as const;
