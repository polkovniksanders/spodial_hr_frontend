import {
  Calendar,
  BookOpen,
  SquareKanban,
  File,
  UsersRound,
} from 'lucide-react';

import { ROUTES } from '@/shared/lib/routes';

import type { MenuProps } from '@/features/menu/types/menu';

export const MENU_ITEMS: MenuProps[] = [
  {
    id: 'teams',
    label: 'Teams',
    icon: 'teams',
    href: ROUTES.DASHBOARD.TEAMS,
  },

  {
    id: 'methodology',
    label: 'Methodologies',
    icon: 'bookOpen',
    href: ROUTES.DASHBOARD.METHODOLOGY,
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: 'calendar',
    href: ROUTES.DASHBOARD.CALENDAR,
  },
  {
    id: 'follow-ups',
    label: 'Follow ups (meetings)',
    icon: 'file',
    href: ROUTES.DASHBOARD.FOLLOWUPS,
  },
  {
    id: 'statistics',
    label: 'Statistics',
    icon: 'kanban',
    href: ROUTES.DASHBOARD.STATISTICS,
  },
];

export const ICONS_MAP = {
  teams: UsersRound,
  bookOpen: BookOpen,
  calendar: Calendar,
  file: File,
  kanban: SquareKanban,
} as const;
