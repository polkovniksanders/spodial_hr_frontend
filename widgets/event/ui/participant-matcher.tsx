import React from 'react';

import ParticipantMatching from '@/features/participants/ui/participant-matching';
import ParticipantsTitle from '@/features/participants/ui/participants-title';

export default function ParticipantMatcher({ eventId, guests, attendees }) {
  return (
    <div>
      <ParticipantsTitle>Match guests</ParticipantsTitle>

      <ParticipantMatching
        eventId={eventId}
        guests={guests}
        attendees={attendees}
      />
    </div>
  );
}
