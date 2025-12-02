import React from 'react';

import { getGuests } from '@/app/actions/participants-actions';
import { participants } from '@/features/participants/lib/options';
import { ParticipantList } from '@/features/participants/ui/participant-list';
import ParticipantsTitle from '@/features/participants/ui/participants-title';

export default async function GuestServer({ id }: { id: string }) {
  const response = await getGuests(id);
  if (!response) return null;
  const data: [] = response.data;

  return (
    <div>
      <ParticipantsTitle>{participants.guest}</ParticipantsTitle>
      <ParticipantList data={data} />
    </div>
  );
}
