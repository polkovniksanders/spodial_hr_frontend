import EventSummary from '@/app/components/event/server/event-summary';
import Participants from '@/app/components/participants/server/participants';

import type { EventProps } from '@/app/components/event/service/event.interface';

export default function EventOverview({
  id,
  data,
}: {
  id: string;
  data: EventProps;
}) {
  return (
    <div className='flex flex-col gap-7'>
      <EventSummary data={data} />
      <Participants eventId={Number(id)} />
    </div>
  );
}
