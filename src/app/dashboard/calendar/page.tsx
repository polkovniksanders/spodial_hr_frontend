import { Suspense } from 'react';

import Card from '@/components/ui/card/Card';
import SpinLoader from '@/components/ui/layout/spin-loader';
import CalendarServer from '@/features/calendar/ui/calendar.server';
import CalendarOnboardingTrigger from '@/features/calendar/ui/CalendarOnboardingTrigger';
import { getSources } from '@/shared/lib/get-sources';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'Calendar events',
};

const Wrapper = ({ children }: PropsWithChildren) => (
  <Card className='h-fit'>{children}</Card>
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
