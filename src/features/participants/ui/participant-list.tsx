import React from 'react';

import type {
  AttendeeProps,
  GuestProps,
} from '@/features/participants/service/participant.interface';

export const ParticipantList = ({
  data,
}: {
  data: AttendeeProps[] | GuestProps[];
}) => {
  return (
    <div className='flex flex-col gap-4'>
      {data
        .sort((a, b) => a.id - b.id)
        .map(item => (
          <div key={item.id} className='flex items-center gap-4'>
            {'name' in item && item.name
              ? item.name
              : (item as GuestProps).email}
          </div>
        ))}
    </div>
  );
};
