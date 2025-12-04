'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { attachCalendarActions } from '@/app/actions/attach-calendar-actions';
import { H1 } from '@/components/ui/typography/H1';

import OnboardingImage from '../server/onboarding-image';

export default function OnboardingTrigger() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAttach = () => {
    startTransition(async () => {
      const url = await attachCalendarActions();

      const popup = window.open(
        url,
        'google_oauth',
        'width=700,height=700,left=' +
          (screen.width / 2 - 350) +
          ',top=100,scrollbars=yes',
      );

      if (!popup) {
        return;
      }

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          router.refresh();
        }
      }, 500);
    });
  };

  return (
    <div className='flex flex-col gap-7.5 justify-center items-center h-full w-full py-12'>
      <H1>Continue with Google</H1>
      <button
        type='button'
        onClick={handleAttach}
        disabled={isPending}
        className='cursor-pointer focus:outline-none'
      >
        <OnboardingImage />
        {isPending && (
          <p className='text-sm mt-4 text-muted-foreground'>
            Waiting Google...
          </p>
        )}
      </button>
    </div>
  );
}
