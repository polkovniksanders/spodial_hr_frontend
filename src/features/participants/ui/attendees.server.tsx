import React from 'react';

import { getAttendees } from '@/app/actions/participants-actions';
import { participants } from '@/features/participants/lib/options';
import { ParticipantList } from '@/features/participants/ui/participant-list';
import ParticipantsTitle from '@/features/participants/ui/participants-title';

export default async function AttendeesServer({ id }: { id: string }) {
  const response = await getAttendees(id);
  if (!response) return null;
  const data: [] = response.data;

  return (
    <div>
      <ParticipantsTitle>{participants.attendee}</ParticipantsTitle>
      <ParticipantList data={data} />
    </div>
  );
}
