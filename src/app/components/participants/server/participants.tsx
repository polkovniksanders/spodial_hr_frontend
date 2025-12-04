import { notFound } from 'next/navigation';
import React from 'react';

import { participants } from '@/app/components/participants/lib/options';
import {
  getAttendees,
  getGuests,
} from '@/app/components/participants/lib/participants-actions';
import { ParticipantList } from '@/app/components/participants/server/participant-list';
import ParticipantsTitle from '@/app/components/participants/server/participants-title';

import Matching from '../client/matching';

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

        <Matching eventId={eventId} guests={guests} attendees={attendees} />
      </div>
    </div>
  );
}
