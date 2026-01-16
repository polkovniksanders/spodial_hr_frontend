import { METRIC_MAX_SCORE } from '@/features/analysis/lib/options';
import MinMax from '@/features/analysis/ui/min-max';

export default function LinearProgressAgenda({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className={'mb-2'}>
      <div className={'flex flex-row justify-between'}>
        <p className={'text-[14px]'}>{title}</p>
        <MinMax minValue={+value || 0} maxValue={METRIC_MAX_SCORE} />
      </div>
    </div>
  );
}
