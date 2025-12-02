import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { type PropsWithChildren, Suspense } from 'react';

import Card from '@/components/ui/card/Card';
import SpinLoader from '@/components/ui/layout/spin-loader';
import CalendarServer from '@/features/calendar/ui/calendar.server';
import OnboardingTrigger from '@/features/calendar/ui/onboarding/onboarding-trigger';
import { getSources } from '@/shared/lib/get-sources';

const Wrapper = ({ children }: PropsWithChildren) => (
  <Card className='h-fit'>{children}</Card>
);

const UnattachedView = () => (
  <Wrapper>
    <OnboardingTrigger />
  </Wrapper>
);

const AttachedView = () => (
  <Wrapper>
    <Suspense fallback={<SpinLoader />}>
      <CalendarServer />
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
