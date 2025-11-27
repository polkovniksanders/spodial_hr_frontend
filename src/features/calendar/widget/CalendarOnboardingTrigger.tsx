'use client';

import OnboardingImage from '@/features/calendar/ui/onboarding/OnboardingImage';
import { H1 } from '@/components/ui/typography/H1';
import { Button } from '@/components/ui/button/Button';
import { BUTTON_TEXT } from '@/features/auth/utils/options';

export default async function CalendarOnboardingTrigger() {
  const attachCalendar = async () => {
    try {
      const res = await fetch('/api/google/oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        // Если сервер вернул ошибку, выводим её в консоль или в форму
        console.error('attachCalendar error:', data.error);

        // Пример: можно установить ошибку в поле 'email' или общую
        // setError('root', { message: data.error });
        return;
      }

      console.log('attachCalendar success:', data);

      // Успех! Токен уже в куках, делаем редирект
      // router.replace(ROUTES.DASHBOARD.CALENDAR);
      // router.refresh(); // Обновляем роутер, чтобы серверные компоненты увидели новую куку
    } catch (err) {
      console.error('Network or unexpected error during register:', err);
    }
  };

  return (
    <div
      className={
        'flex flex-col gap-7.5 w-[654px] justify-center items-center h-full w-full'
      }
    >
      <H1>Continue with Google</H1>
      <OnboardingImage />

      <div onClick={attachCalendar} className={'px-[54px] w-full'}>
        <Button>{BUTTON_TEXT.GET_STARTED}</Button>
      </div>
    </div>
  );
}
