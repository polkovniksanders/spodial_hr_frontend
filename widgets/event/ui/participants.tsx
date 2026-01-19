import React from 'react';

import { ParticipantList } from '@/features/participants/ui/participant-list';
import ParticipantsTitle from '@/features/participants/ui/participants-title';

export default function Participants({ list, title }: { list; title }) {
  return (
    <div>
      <ParticipantsTitle>{title}</ParticipantsTitle>
      <ParticipantList data={list} />
    </div>
  );
}
