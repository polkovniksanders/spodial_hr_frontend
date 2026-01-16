import { Minus } from 'lucide-react';

import { findMinMax } from '@/features/analysis/lib/findMinMaxKeys';
import ComponentCard from '@/features/analysis/ui/component-card';
import MinMax from '@/features/analysis/ui/min-max';

import type { AnalysisJSON } from '@/features/analysis/model/types';

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
