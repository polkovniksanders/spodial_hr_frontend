import type { TranscriptProps } from '@/features/meeting/service/meeting.interface';

interface Props {
  data: TranscriptProps[];
}

export default function TranscriptData({ data }: Props) {
  return (
    <div className={'flex flex-col gap-4'}>
      {data.map(item => (
        <div key={item.id}>
          <div className={'flex flex-row gap-2 items-center'}>
            <p className={'font-inter text-sm font-normal leading-normal'}>
              {item.start_absolute}
            </p>
            <p
              className={
                'font-inter text-sm font-normal leading-normal text-primary'
              }
            >
              {item.participant.name}
            </p>
          </div>

          <div>
            <p className={'font-inter text-base font-normal leading-normal'}>
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
