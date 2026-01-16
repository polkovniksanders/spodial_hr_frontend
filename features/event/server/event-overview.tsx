import EventSummary from '@/features/event/server/event-summary';
import Participants from '@/features/participants/ui/participants';

import type { EventProps } from '@/features/event/model/types';

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
