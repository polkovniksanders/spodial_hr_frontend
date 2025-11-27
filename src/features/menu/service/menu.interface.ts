import { Calendar } from 'lucide-react';

const ICONS: Record<'calendar', typeof Calendar> = { calendar: Calendar };

export interface MenuProps {
  key: string;
  name: string;
  iconKey: keyof typeof ICONS;
  route: string;
}
