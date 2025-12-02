'use client';

import { useTransition } from 'react';

import { attachCalendarActions } from '@/app/actions/attach-calendar-actions';
import { H1 } from '@/components/ui/typography/H1';

import OnboardingImage from './onboarding-image';

export default function OnboardingTrigger() {
  const [isPending, startTransition] = useTransition();

  const handleAttach = () => {
    startTransition(async () => {
      const url = await attachCalendarActions();

      console.log('url', url);

      const popup = window.open(
        url,
        'google_oauth',
        'width=700,height=700,left=' + (screen.width / 2 - 350) + ',top=100',
      );

      if (!popup) alert('Разрешите всплывающие окна');

      // После закрытия попапа — обновляем страницу
      const timer = setInterval(() => {
        if (popup?.closed) {
          clearInterval(timer);
          globalThis.location.reload();
        }
      }, 800);
    });
  };

  return (
    <div className='flex flex-col gap-7.5 justify-center items-center h-full w-full py-12'>
      <H1>Continue with Google</H1>
      <button
        type='button'
        onClick={handleAttach}
        disabled={isPending}
        className='cursor-pointer'
      >
        <OnboardingImage />
        {isPending && <div className='text-sm mt-2'>Открываем Google...</div>}
      </button>
    </div>
  );
}
