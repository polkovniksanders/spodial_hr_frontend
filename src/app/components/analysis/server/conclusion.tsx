import { InsightSection } from '@/app/components/analysis/server/insight-section';
import { H4 } from '@/components/ui/typography/H4';

interface Props {
  action_plan: string[];
  areas_for_development: string[];
  strengths: string[];
}

export default function Conclusion({ list }: { list: Props }) {
  return (
    <div className='py-6'>
      <H4>Качественные инсайты</H4>

      <div className='grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-6 lg:gap-4'>
        <InsightSection title='Сильные стороны' items={list.strengths} />
        <InsightSection
          title='Зоны развития'
          items={list.areas_for_development}
        />
        <InsightSection title='Рекомендованный план' items={list.action_plan} />
      </div>
    </div>
  );
}
