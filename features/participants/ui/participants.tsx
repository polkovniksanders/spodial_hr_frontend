import { notFound } from 'next/navigation';
import React from 'react';

import { getAttendees, getGuests } from '@/app/actions/participants';
import { participants } from '@/features/participants/lib/options';
import { ParticipantList } from '@/features/participants/ui/participant-list';
import ParticipantsTitle from '@/features/participants/ui/participants-title';

import ParticipantMatching from './participant-matching';

export default async function Participants({ eventId }: { eventId: number }) {
  const [attendeesRes, guestsRes] = await Promise.all([
    getAttendees(eventId),
    getGuests(eventId),
  ]);

  if (!attendeesRes || !guestsRes) {
    notFound();
  }

  const attendees = attendeesRes.data;
  const guests = guestsRes.data;

  return (
    <div className='flex flex-row gap-16'>
      <div>
        <ParticipantsTitle>{participants.guest}</ParticipantsTitle>
        <ParticipantList data={guests} />
      </div>

      <div>
        <ParticipantsTitle>{participants.attendee}</ParticipantsTitle>
        <ParticipantList data={attendees} />
      </div>

      <div>
        <ParticipantsTitle>Match guests</ParticipantsTitle>

        <ParticipantMatching
          eventId={eventId}
          guests={guests}
          attendees={attendees}
        />
      </div>
    </div>
  );
}
