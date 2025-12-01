import SpinLoader from '@/components/ui/layout/SpinLoader';
import { getEvents } from '@/features/calendar/lib/get-events';
import Calendar from '@/features/calendar/ui/Calendar';

export default async function CalendarServer() {
  const response = await getEvents();

  if (!response) return null;

  const data = response.data;

  if (!data) return <SpinLoader />;

  return <Calendar events={data} />;
}
