import React from 'react';

import { getGuests } from '@/features/meeting/service/get-guests';
import GuestListTitle from '@/features/meeting/ui/overview/GuestListTitle';

export default async function GuestServer({ id }: { id: string }) {
  const response = await getGuests(id);
  if (!response) return null;
  const data: [] = response.data;

  console.log('Guests data', data);

  return (
    <div>
      <GuestListTitle>Invited guests</GuestListTitle>
      <div className='flex flex-col gap-2'>
        {data.map(({ email }) => (
          <div key={email} className='flex items-center gap-4'>
            {email}
          </div>
        ))}
      </div>
    </div>
  );
}
