import ComponentCard from '@/features/analysis/ui/component-card';
import LinearProgressAgenda from '@/features/analysis/ui/lib/linear-progress-agenda';
import LinearProgressTitle from '@/features/analysis/ui/lib/linear-progress-title';
import LinearProgress from '@/features/analysis/ui/linear-progress';

import type { MetricGroup } from '@/features/analysis/model/types';

export default function Linear({ display_name, value }: MetricGroup) {
  return (
    <div className={'flex flex-col gap-2'}>
      <LinearProgressTitle title={display_name} />

      <div
        className='grid gap-4'
        style={{
          gridTemplateColumns: `repeat(${Math.min(value.length, 4)}, minmax(0, 1fr))`,
        }}
      >
        {value.map(v => (
          <ComponentCard key={v.display_name}>
            <LinearProgressAgenda title={v.display_name} value={v.value} />
            <LinearProgress value={+v.value} />
          </ComponentCard>
        ))}
      </div>
    </div>
  );
}
