import { Minus } from 'lucide-react';

import { findMinMax } from '@/app/components/analysis/lib/findMinMaxKeys';
import ComponentCard from '@/app/components/analysis/server/component-card';
import MinMax from '@/app/components/analysis/server/min-max';

import type { AnalysisJSON } from '@/app/components/analysis/service/analysis.interface';

export default function Summary({ metrics }: Pick<AnalysisJSON, 'metrics'>) {
  const { minValue, maxValue, maxName, minName } = findMinMax(metrics);

  if (!metrics) return;

  return (
    <div className={'grid grid-cols-2 gap-4'}>
      {maxValue && maxName && (
        <ComponentCard>
          <p className={'font-medium text-[20px] mb-2'}>Maximum contribution</p>

          <div className={'flex flex-row items-center'}>
            <p className={'font-medium text-[20px]'}>{maxName}</p>
            <Minus /> <MinMax minValue={+maxValue} />
          </div>
        </ComponentCard>
      )}

      {minValue && minName && (
        <ComponentCard>
          <p className={'font-medium text-[20px] mb-2'}>
            The main focus is on growth
          </p>
          <div className={'flex flex-row items-center'}>
            <p className={'font-medium text-[20px]'}>{minName}</p>
            <Minus />
            <MinMax minValue={minValue} />
          </div>
        </ComponentCard>
      )}
    </div>
  );
}
