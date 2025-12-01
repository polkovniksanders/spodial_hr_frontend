interface Props {
  data: TranscriptProps[];
}

interface TranscriptProps {
  end_absolute: string;
  end_relative: string;
  id: number;
  participant: null;
  start_absolute: string;
  start_relative: string;
  text: string;
}

export default function Transcript({ data }: Props) {
  console.log('data', data);

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
              {item.id}
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
