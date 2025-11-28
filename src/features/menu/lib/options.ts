import { Calendar } from 'lucide-react';

import type { MenuProps } from '@/features/menu/service/menu.interface';

export const MENU: MenuProps[] = [
  {
    key: 'calendar',
    name: 'Calendar',
    iconKey: 'calendar',
    route: 'calendar',
  },
];

export const ICONS: Record<'calendar', typeof Calendar> = {
  calendar: Calendar,
} as const;
