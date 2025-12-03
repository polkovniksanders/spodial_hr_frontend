import EventSummary from '@/features/event/ui/event-summary';
import ParticipantsWrapper from '@/features/participants/ui/participants-wrapper';

import type { EventProps } from '@/features/event/service/event.interface';

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
      <ParticipantsWrapper eventId={Number(id)} />
    </div>
  );
}
