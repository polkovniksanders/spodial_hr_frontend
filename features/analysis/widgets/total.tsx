import React, { type ReactNode } from 'react';

import { renderScoreDescription } from '@/features/analysis/lib/score';
import ChartDonut from '@/features/analysis/ui/lib/chart-donut';
import { H4 } from '@/shared/ui/typography/H4';

import type { AnalysisJSON } from '@/features/analysis/model/types';

export default function Total({ total }: Pick<AnalysisJSON, 'total'>) {
  return (
    <div className={'flex flex-row items-center gap-4'}>
      <ChartDonut value={+total.current_value} />

      <div className={'flex flex-col gap-4'}>
        <H4>
          {total.display_name}
          {total.max_value && (
            <>
              <span className='font-bold'>
                {total.current_value as ReactNode}
              </span>
              out of <span className='font-bold'>{total.max_value}</span>
            </>
          )}
        </H4>

        {total.max_value && (
          <div>
            <p className={'text-secondary'}>
              {renderScoreDescription(+total.current_value, +total.max_value)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
