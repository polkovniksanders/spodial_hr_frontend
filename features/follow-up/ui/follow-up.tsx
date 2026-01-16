import { meetingFollowUp, getFollowUps } from '@/app/actions/meeting-follow-up';
import FollowUpDetails from '@/features/follow-up/ui/follow-up-details';

import type {
  FollowUpResponse,
  FollowUpsResponse,
} from '@/features/follow-up/model/types';

export default async function FollowUp({ id }: { id: number }) {
  const followUps: FollowUpsResponse = await getFollowUps(id);

  if (!followUps?.data || followUps.data.length === 0) {
    return <div>No follow up</div>;
  }

  const latestId = Math.max(...followUps.data.map(item => item.id));
  const followUp: FollowUpResponse = await meetingFollowUp(latestId);

  return <FollowUpDetails data={followUp.data} />;
}
