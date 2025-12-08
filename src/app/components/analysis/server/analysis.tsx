import Conclusion from '@/app/components/analysis/widgets/conclusion';
import Linear from '@/app/components/analysis/widgets/linear';
import Summary from '@/app/components/analysis/widgets/summary';
import Total from '@/app/components/analysis/widgets/total';
import {
  getFollowUp,
  getFollowUps,
} from '@/app/components/follow-up/service/get-follow-up';

import type { AnalysisJSON } from '@/app/components/analysis/service/analysis.interface';
import type {
  FollowUpResponse,
  FollowUpsResponse,
} from '@/app/components/follow-up/service/follow-up.interface';

export default async function Analysis({ id }: { id: number }) {
  const followUps: FollowUpsResponse = await getFollowUps(id);

  if (!followUps?.data || followUps.data.length === 0) {
    return <div>No analysis</div>;
  }

  const latestId = Math.max(...followUps.data.map(item => item.id));
  const followUp: FollowUpResponse = await getFollowUp(latestId);

  let parsed: AnalysisJSON;
  try {
    parsed = JSON.parse(followUp.data.text) as AnalysisJSON;
  } catch {
    return <div>Error in JSON</div>;
  }

  if (!parsed) return;

  console.log('parsed', parsed);

  return (
    <div className={'flex flex-col gap-10'}>
      {parsed.total && <Total total={parsed.total} />}
      <Summary metrics={parsed.metrics} />
      {parsed.metrics.map((item, index) => (
        <Linear key={index} {...item} />
      ))}
      {parsed.conclusion && <Conclusion conclusion={parsed.conclusion} />}
    </div>
  );
}
