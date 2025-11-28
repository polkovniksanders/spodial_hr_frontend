import type { ICONS } from '@/features/menu/utils/options';

export interface MenuProps {
  key: string;
  name: string;
  iconKey: keyof typeof ICONS;
  route: string;
}
