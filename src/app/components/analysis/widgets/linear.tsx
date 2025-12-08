import ComponentCard from '@/app/components/analysis/server/component-card';
import LinearProgress from '@/app/components/analysis/server/lib/linear-progress';
import LinearProgressAgenda from '@/app/components/analysis/server/lib/linear-progress-agenda';
import LinearProgressTitle from '@/app/components/analysis/server/lib/linear-progress-title';

import type { MetricGroup } from '@/app/components/analysis/service/analysis.interface';

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
            <LinearProgress value={v.value} />
          </ComponentCard>
        ))}
      </div>
    </div>
  );
}
