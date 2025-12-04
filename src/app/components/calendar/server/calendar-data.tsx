import Calendar from '@/app/components/calendar/client/calendar';
import { getEvents } from '@/app/components/calendar/lib/get-events';

export default async function CalendarData() {
  const eventsData = await getEvents();
  if (!eventsData) return null;
  const events = eventsData.data;

  return <Calendar events={events} />;
}
