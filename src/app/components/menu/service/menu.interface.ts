import type { ICONS } from '@/app/components/menu/lib/options';

export interface MenuProps {
  key: keyof typeof ICONS;
  name: string;
  route: string;
}
