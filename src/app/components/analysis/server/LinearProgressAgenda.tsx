export default function LinearProgressAgenda({
  min,
  max,
  title,
}: {
  min: number;
  max: number;
  title: string;
}) {
  return (
    <div className={'mb-2'}>
      <div className={'flex flex-row justify-between'}>
        <p>{title}</p>

        <p className={'text-[14px]'}>
          {min} из {max}
        </p>
      </div>
    </div>
  );
}
