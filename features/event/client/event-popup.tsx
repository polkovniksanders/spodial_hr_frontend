import { Minus, Plus } from 'lucide-react';
import React, { type JSX, useState } from 'react';

import { switchBot } from '@/app/actions/calendar-events';
import EventSummary from '@/features/event/server/event-summary';
import { participants } from '@/features/participants/lib/options';
import ParticipantsTitle from '@/features/participants/ui/participants-title';
import { Button } from '@/shared/ui/button/Button';
import ModalBody from '@/shared/ui/modal/modal-body';
import ModalFooter from '@/shared/ui/modal/modal-footer';
import ModalHeader from '@/shared/ui/modal/modal-header';

import type { EventProps } from '@/features/event/model/types';

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
    <>
      <ModalHeader onClick={close} title={event.title} />
      <ModalBody>
        <div className='flex flex-col gap-7'>
          <EventSummary data={event} />
        </div>

        <div className={'flex flex-row justify-between mt-6'}>
          <div>
            <ParticipantsTitle>{participants.guest}</ParticipantsTitle>
          </div>

          <div>
            <ParticipantsTitle>{participants.attendee}</ParticipantsTitle>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <div className={'ml-auto w-[250px]'}>
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
      </ModalFooter>
    </>
  );
}
