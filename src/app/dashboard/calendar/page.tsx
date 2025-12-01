import { Suspense } from 'react';

import Card from '@/components/ui/card/Card';
import SpinLoader from '@/components/ui/layout/SpinLoader';
import Calendar from '@/features/calendar/ui/Calendar';
import CalendarServer from '@/features/calendar/ui/Calendar.server';
import CalendarOnboardingTrigger from '@/features/calendar/ui/CalendarOnboardingTrigger';
import { getSources } from '@/shared/lib/get-sources';

import type { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Calendar',
  description: 'Calendar events',
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
    <Suspense fallback={<SpinLoader />}>
      <CalendarServer />
    </Suspense>
  </Wrapper>
);

export default async function Page() {
  const { data } = await getSources();

  const isCalendarAttached = data?.length > 0;

  return isCalendarAttached ? <AttachedView /> : <UnattachedView />;
}
