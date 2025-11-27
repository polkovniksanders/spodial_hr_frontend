import Card from '@/components/ui/card/Card';
import Calendar from '@/features/calendar/ui/Calendar';
import CalendarOnboardingTrigger from '@/features/calendar/widget/CalendarOnboardingTrigger';
import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';
import { getSources } from '@/shared/lib/get-sources';

export const metadata = {
  title: 'Календарь',
  description: 'Ваш календарь событий',
};

const Wrapper = ({ children }: PropsWithChildren) => (
  <Card className='min-h-full h-full'>{children}</Card>
);

const UnattachedView = () => (
  <Wrapper>
    <CalendarOnboardingTrigger />
  </Wrapper>
);

const AttachedView = () => (
  <Wrapper>
    <Suspense fallback={<div></div>}>
      <Calendar />
    </Suspense>
  </Wrapper>
);

export default async function Page() {
  const { data } = await getSources();

  const isCalendarAttached = data?.length > 0;

  return isCalendarAttached ? <AttachedView /> : <UnattachedView />;
}
