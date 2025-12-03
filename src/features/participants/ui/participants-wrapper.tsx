import { notFound } from 'next/navigation';
import React from 'react';

import { participants } from '@/features/participants/lib/options';
import {
  getAttendees,
  getGuests,
} from '@/features/participants/lib/participants-actions';
import { ParticipantList } from '@/features/participants/ui/participant-list';
import ParticipantsTitle from '@/features/participants/ui/participants-title';

import Matching from './matching';

export default async function ParticipantsWrapper({
  eventId,
}: {
  eventId: number;
}) {
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

        <Matching eventId={eventId} guests={guests} attendees={attendees} />
      </div>
    </div>
  );
}
