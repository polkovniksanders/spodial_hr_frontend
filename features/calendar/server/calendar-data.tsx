import { getEvents } from '@/app/actions/calendar-events';

import Calendar from '../../../features/calendar/client/calendar';

export default async function CalendarData() {
  const { data: events } = await getEvents();
  if (!events) return null;

  return <Calendar events={events} />;
}
