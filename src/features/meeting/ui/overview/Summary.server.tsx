import EventSummary from '@/features/event/ui/event-summary';
import AttendeesServer from '@/features/participants/ui/attendees.server';
import GuestServer from '@/features/participants/ui/guest.server';

import type { EventProps } from '@/features/event/service/event.interface';

export default async function SummaryServer({
  id,
  data,
}: {
  id: string;
  data: EventProps;
}) {
  return (
    <div className='flex flex-col gap-7'>
      <EventSummary data={data} />
      <div className={'flex flex-row gap-[64px]'}>
        <GuestServer id={id} />
        <AttendeesServer id={id} />
      </div>
    </div>
  );
}
