import { getEvents } from '@/app/components/calendar/lib/get-events';
import CalendarClient from '@/app/components/calendar/ui/calendar.client';

export default async function CalendarServer() {
  const eventsData = await getEvents();
  if (!eventsData) return null;
  const events = eventsData.data;

  return <CalendarClient events={events} />;
}
