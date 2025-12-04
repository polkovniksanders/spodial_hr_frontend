import { formatChatTime } from '@/app/components/transcript/lib/chatTime';

import type { TranscriptProps } from '@/app/components/transcript/service/transcript.interface';

export default function TranscriptList({ data }: { data: TranscriptProps[] }) {
  if (!data) return;

  return (
    <div className={'flex flex-col gap-4'}>
      {data.map(item => (
        <div key={item.id}>
          <div className={'flex flex-row gap-2 items-center'}>
            <p className={'text-sm font-normal leading-normal'}>
              {formatChatTime(Number(item.start_relative))}
            </p>
            <p className={'text-sm font-normal leading-normal text-primary'}>
              {item.participant.name}
            </p>
          </div>

          <div>
            <p className={'text-base font-normal leading-normal'}>
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
