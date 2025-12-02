'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { H1 } from '@/components/ui/typography/H1';
import OnboardingImage from '@/features/calendar/ui/onboarding/OnboardingImage';

export default function CalendarOnboardingTrigger() {
  const channelRef = useRef<BroadcastChannel | null>(null);

  const router = useRouter();

  useEffect(() => {
    channelRef.current = new BroadcastChannel('google-oauth-channel');

    channelRef.current.onmessage = event => {
      if (event.data === 'success') {
        router.refresh(); // ← Обновит все серверные данные (включая getSources)
        channelRef.current?.close();
      }
    };

    return () => {
      channelRef.current?.close();
    };
  }, [router]);

  const attachCalendar = async () => {
    try {
      const res = await fetch('/api/calendar/attach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) return;

      const { data } = await res.json();

      const popup = window.open(
        data.redirect,
        'google_oauth',
        'width=700,height=700,left=' +
          (screen.width / 2 - 350) +
          ',top=100,scrollbars=yes',
      );

      if (!popup) {
        // eslint-disable-next-line no-alert
        alert('Разрешите всплывающие окна');
      }
    } catch (error) {
      console.error(error);
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
