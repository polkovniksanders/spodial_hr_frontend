import EventSummary from '@/features/event/ui/EventSummary';
import { getSummary } from '@/features/meeting/service/get-summary';
import GuestServer from '@/features/meeting/ui/overview/Guest.server';
import ParticipantServer from '@/features/meeting/ui/overview/Participant.server';

export default async function SummaryServer({ id }: { id: string }) {
  const summary = await getSummary(id);
  if (!summary) return null;
  const data = summary.data;

  return (
    <div className='flex flex-col gap-7'>
      <EventSummary data={data} />

      <div className={'flex flex-row gap-[64px]'}>
        <GuestServer id={id} />
        <ParticipantServer id={id} />
      </div>
    </div>
  );
}
