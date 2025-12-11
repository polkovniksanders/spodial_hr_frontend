import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { type PropsWithChildren, Suspense } from 'react';

import OnboardingTrigger from '@/app/components/calendar/client/onboarding-trigger';
import CalendarData from '@/app/components/calendar/server/calendar-data';
import Card from '@/components/ui/card/Card';
import SpinLoader from '@/components/ui/layout/spin-loader';
import { getSources } from '@/shared/lib/get-sources';

const Wrapper = ({ children }: PropsWithChildren) => (
  <Card className='h-full flex flex-col overflow-hidden'>{children}</Card>
);

const UnattachedView = () => (
  <Wrapper>
    <OnboardingTrigger />
  </Wrapper>
);

const AttachedView = () => (
  <Wrapper>
    <Suspense fallback={<SpinLoader />}>
      <CalendarData />
    </Suspense>
  </Wrapper>
);

export default async function Page({
  searchParams,
}: {
  searchParams: { attached?: string };
}) {
  if (searchParams.attached === '1') {
    revalidatePath('/dashboard/calendar');
    redirect('/dashboard/calendar');
  }

  const { data } = await getSources();
  const isCalendarAttached = data?.length > 0;

  return isCalendarAttached ? <AttachedView /> : <UnattachedView />;
}
