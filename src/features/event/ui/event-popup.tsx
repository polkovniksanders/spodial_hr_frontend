import React from 'react';

import { switchBot } from '@/app/actions/bot-actions';
import { Button } from '@/components/ui/button/Button';
import ButtonClose from '@/components/ui/button/ButtonClose';
import { H4 } from '@/components/ui/typography/H4';
import EventSummary from '@/features/event/ui/event-summary';
import { participants } from '@/features/participants/lib/options';
import ParticipantsTitle from '@/features/participants/ui/participants-title';

import type { EventProps } from '@/features/event/service/event.interface';

export const EventPopup = ({
  event,
  close,
}: {
  event: EventProps;
  close: () => void;
}) => {
  const addBot = async () => {
    try {
      await switchBot(event.id).then(() => close?.());
    } catch {}
  };

  return (
    <div className='bg-white rounded-3xl shadow-2xl border border-gray-200 min-w-80'>
      <div className='flex flex-row justify-between items-center px-[38px] pt-[26px] pb-[18px] border-b-border-primary'>
        <H4>{event.title}</H4>

        <ButtonClose close={close} />
      </div>

      <div className='flex flex-col gap-7 px-[38px] my-[26px]'>
        <EventSummary data={event} />
      </div>

      <div className={'flex flex-row gap-16 px-[38px] my-[26px]'}>
        <div>
          <ParticipantsTitle>{participants.guest}</ParticipantsTitle>
        </div>

        <div>
          <ParticipantsTitle>{participants.attendee}</ParticipantsTitle>
        </div>
      </div>

      <div className={'w-full justify-end flex pb-[18px] px-[38px]'}>
        <Button onClick={addBot}>+ add bot</Button>
      </div>
    </div>
  );
};
