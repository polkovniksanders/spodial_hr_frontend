import ButtonClose from '@/components/ui/button/ButtonClose';
import { H4 } from '@/components/ui/typography/H4';
import EventSummary from '@/features/event/ui/EventSummary';

import type { EventProps } from '@/features/calendar/service/event.interface';

export const EventPopup = ({
  event,
  close,
}: {
  event: EventProps;
  close: () => void;
}) => {
  console.log('event', event);

  return (
    <div className='bg-white rounded-3xl shadow-2xl border border-gray-200 min-w-80'>
      <div className='flex flex-row justify-between items-center px-[38px] pt-[26px] pb-[18px] border-b-border-primary'>
        <H4> {event.title}</H4>

        <ButtonClose close={close} />
      </div>

      <div className='flex flex-col gap-7 px-[38px] my-[26px]'>
        <EventSummary data={event} />
      </div>
    </div>
  );
};
