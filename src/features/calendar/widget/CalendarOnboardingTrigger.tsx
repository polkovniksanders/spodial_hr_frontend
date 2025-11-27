'use client';

import OnboardingImage from '@/features/calendar/ui/onboarding/OnboardingImage';
import { H1 } from '@/components/ui/typography/H1';

export default function CalendarOnboardingTrigger() {
  const attachCalendar = async () => {
    try {
      const res = await fetch('/api/calendar/attach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { data } = await res.json();

      if (!res.ok) {
        // setError('root', { message: data.error });
        return;
      }

      console.log('attachCalendar success:', data.redirect);

      const width = 700;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        data.redirect,
        'google_oauth',
        `width=${width},height=${height},left=${left},top=${top}`,
      );

      const timer = setInterval(() => {
        if (popup?.closed) {
          clearInterval(timer);
          // обновить состояние, сделать refetch /api/calendar/status
        }
      }, 500);
    } catch (err) {
      console.error('Network or unexpected error during register:', err);
    }
  };

  return (
    <div
      className={
        'flex flex-col gap-7.5  justify-center items-center h-full w-full'
      }
    >
      <H1>Continue with Google</H1>

      <div className={'cursor-pointer'} onClick={attachCalendar}>
        <OnboardingImage />
      </div>
    </div>
  );
}
