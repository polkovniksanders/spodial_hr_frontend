import { Minus, Plus } from 'lucide-react';
import React, { type JSX, useState } from 'react';

import { switchBot } from '@/app/actions/bot-actions';
import EventSummary from '@/app/components/event/server/event-summary';
import { participants } from '@/app/components/participants/lib/options';
import ParticipantsTitle from '@/app/components/participants/server/participants-title';
import { Button } from '@/components/ui/button/Button';
import ButtonClose from '@/components/ui/button/button-close';
import { H4 } from '@/components/ui/typography/H4';

import type { EventProps } from '@/app/components/event/service/event.interface';

export function EventPopup({
  event,
  close,
}: {
  event: EventProps;
  close: () => void;
}): JSX.Element {
  const [isSwitching, setIsSwitching] = useState(false);

  const isBotAdded = event.required_bot;
  const Icon = isBotAdded ? Minus : Plus;
  const actionText = isBotAdded ? 'remove bot' : 'add bot';

  const handleSwitchBot = async () => {
    if (isSwitching) return;

    setIsSwitching(true);
    try {
      await switchBot(event.id, !event.required_bot);
      close();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <div className='bg-white rounded-3xl shadow-2xl border border-gray-200'>
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

      <div className='flex justify-end px-8 pb-6'>
        <Button
          onClick={handleSwitchBot}
          disabled={isSwitching}
          loading={isSwitching}
          aria-label={isBotAdded ? 'remove bot' : 'add bot'}
        >
          <div className='flex items-center gap-3'>
            <Icon size={24} aria-hidden='true' />
            <span>{actionText}</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
