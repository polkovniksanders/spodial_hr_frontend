import { Calendar, BookOpen } from 'lucide-react';

import type { MenuProps } from '@/app/components/menu/service/menu.interface';

export const MENU: MenuProps[] = [
  {
    key: 'calendar',
    name: 'Calendar',
    route: 'calendar',
  },
  {
    key: 'methodology',
    name: 'Methodology',
    route: 'methodology',
  },
];

export const ICONS: Record<'calendar' | 'methodology', typeof Calendar> = {
  calendar: Calendar,
  methodology: BookOpen,
} as const;
