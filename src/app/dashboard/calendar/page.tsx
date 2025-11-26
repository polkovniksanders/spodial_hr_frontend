import Card from '@/components/ui/card/Card';
import Calendar from '@/features/calendar/ui/Calendar';
import { getTokenFromRequest } from '@/shared/utils/getTokenFromRequest';
import CalendarOnboardingTrigger from '@/features/calendar/widget/CalendarOnboardingTrigger';
import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';

export const metadata = {
  title: 'Календарь',
  description: 'Ваш календарь событий',
};

const Wrapper = ({ children }: PropsWithChildren) => (
  <Card className='min-h-full h-full'>{children}</Card>
);

const UnauthorizedView = () => (
  <Wrapper>
    <CalendarOnboardingTrigger />
  </Wrapper>
);

const AuthorizedView = () => (
  <Wrapper>
    <Suspense fallback={<div></div>}>
      <Calendar />
    </Suspense>
  </Wrapper>
);

export default async function Page() {
  return (
    <>
      <AuthorizedView /> : <UnauthorizedView />
    </>
  );
}
