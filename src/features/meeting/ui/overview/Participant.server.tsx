import React from 'react';

import { getParticipants } from '@/features/meeting/service/get-participants';
import GuestListTitle from '@/features/meeting/ui/overview/GuestListTitle';

export default async function ParticipantServer({ id }: { id: string }) {
  const response = await getParticipants(id);
  if (!response) return null;
  const data: [] = response.data;

  console.log('Participants', data);

  return (
    <div>
      <GuestListTitle>Actual attendees</GuestListTitle>

      <div className='flex flex-col gap-7'>
        {data.map(({ email }) => (
          <div key={email} className='flex items-center gap-4'>
            {email}
          </div>
        ))}
      </div>
    </div>
  );
}
