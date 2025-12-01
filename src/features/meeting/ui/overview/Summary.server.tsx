import { items } from '@/features/meeting/lib/options';
import { getSummary } from '@/features/meeting/service/get-summary';
import GuestServer from '@/features/meeting/ui/overview/Guest.server';
import ParticipantServer from '@/features/meeting/ui/overview/Participant.server';

const iconClass = 'w-6 h-6 text-gray-600 shrink-0';
const textClass = 'font-normal text-[20px] text-gray-900';

export default async function SummaryServer({ id }: { id: string }) {
  const summary = await getSummary(id);
  if (!summary) return null;
  const data = summary.data;

  return (
    <div className='flex flex-col gap-7'>
      {items.map(({ Icon, value, label }) => (
        <div key={label} className='flex items-center gap-4'>
          <Icon className={iconClass} />
          <p className={textClass}>{value(data)}</p>
        </div>
      ))}

      <div className={'flex flex-row gap-[64px]'}>
        <GuestServer id={id} />
        <ParticipantServer id={id} />
      </div>
    </div>
  );
}
