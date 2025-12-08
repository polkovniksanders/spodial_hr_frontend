import React, { type ReactNode } from 'react';

import { renderScoreDescription } from '@/app/components/analysis/lib/score';
import ChartDonut from '@/app/components/analysis/server/lib/chart-donut';
import { H4 } from '@/components/ui/typography/H4';

import type { AnalysisJSON } from '@/app/components/analysis/service/analysis.interface';

export default function Total({
  total: { display_name, value, maxValue },
}: Pick<AnalysisJSON, 'total'>) {
  return (
    <div className={'flex flex-row items-center gap-4'}>
      <ChartDonut value={+value} />

      <div className={'flex flex-col gap-4'}>
        <H4>
          {display_name}{' '}
          {maxValue && (
            <>
              <span className='font-bold'>{value as ReactNode}</span> out of{' '}
              <span className='font-bold'>{maxValue}</span>
            </>
          )}
        </H4>

        {maxValue && (
          <div>
            <p className={'text-secondary'}>
              {renderScoreDescription(+value, +maxValue)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
