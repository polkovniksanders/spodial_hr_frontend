import { getEvents } from '@/app/actions/get-events';

import Calendar from '../../../features/calendar/client/calendar';

export default async function CalendarData() {
  const eventsData = await getEvents();
  if (!eventsData) return null;
  const events = eventsData.data;

  return <Calendar events={events} />;
}
