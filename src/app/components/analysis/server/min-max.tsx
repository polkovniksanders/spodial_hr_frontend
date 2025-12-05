import { METRIC_MAX_SCORE } from '@/app/components/analysis/lib/options';

export default function MinMax({
  minValue,
  maxValue = METRIC_MAX_SCORE,
}: {
  minValue: number;
  maxValue?: number;
}) {
  return (
    <span>
      <p className={'text-[14px]'}>
        {minValue} из {maxValue}
      </p>
    </span>
  );
}
