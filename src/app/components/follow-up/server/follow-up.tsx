import FollowUpDetails from '@/app/components/follow-up/server/follow-up-details';
import {
  getFollowUp,
  getFollowUps,
} from '@/app/components/follow-up/service/get-follow-up';

import type {
  FollowUpResponse,
  FollowUpsResponse,
} from '@/app/components/follow-up/service/follow-up.interface';

export default async function FollowUp({ id }: { id: number }) {
  const followUps: FollowUpsResponse = await getFollowUps(id);

  if (!followUps?.data || followUps.data.length === 0) {
    return <div>No follow up</div>;
  }

  const latestId = Math.max(...followUps.data.map(item => item.id));
  const followUp: FollowUpResponse = await getFollowUp(latestId);

  return <FollowUpDetails data={followUp.data} />;
}
