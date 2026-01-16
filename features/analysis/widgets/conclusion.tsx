import { InsightSection } from '@/features/analysis/ui/insight-section';
import { H4 } from '@/shared/ui/typography/H4';

import type { AnalysisJSON } from '@/features/analysis/model/types';

export default function Conclusion({
  conclusion: { display_name, value },
}: Pick<AnalysisJSON, 'conclusion'>) {
  return (
    <div className='py-6'>
      <H4>{display_name}</H4>

      <div
        className='grid gap-4'
        style={{
          gridTemplateColumns: `repeat(${Math.min(value.length, 4)}, minmax(0, 1fr))`,
        }}
      >
        {value.map((item, index) => (
          <InsightSection
            key={index}
            title={item.display_name}
            items={[...item.value]}
          />
        ))}
      </div>
    </div>
  );
}
