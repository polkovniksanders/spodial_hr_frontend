import type { ICONS } from '@/features/menu/lib/options';

export interface MenuProps {
  key: string;
  name: string;
  iconKey: keyof typeof ICONS;
  route: string;
}
