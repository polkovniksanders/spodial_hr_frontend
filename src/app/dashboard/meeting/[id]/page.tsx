import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

import ButtonsRow from '@/components/ui/button/ButtonsRow';
import Card from '@/components/ui/card/Card';
import SpinLoader from '@/components/ui/layout/spin-loader';
import { available_tabs } from '@/features/meeting/lib/options';
import { getSummary } from '@/features/meeting/service/get-summary';
import FollowUp from '@/features/meeting/ui/follow-up/follow-up';
import MeetingHeader from '@/features/meeting/ui/MeetingHeader';
import SummaryServer from '@/features/meeting/ui/overview/Summary.server';
import TranscriptWrapper from '@/features/transcript/transcript-wrapper';
import { ROUTES } from '@/shared/lib/routes';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;
  const { tab = available_tabs.summary } = await searchParams;

  const summary = await getSummary(id);

  if (!summary) return notFound();
  const { data } = summary;

  const validTabs = ['summary', 'followup', 'transcript'] as const;
  const currentTab = validTabs.includes(tab as any) ? tab : 'summary';

  if (tab !== currentTab)
    redirect(`${ROUTES.DASHBOARD.MEETING}/${id}?tab=${currentTab}`);

  return (
    <Card className='min-h-full h-full overflow-x-hidden overflow-y-scroll'>
      <MeetingHeader title={data.title} />

      <div className='my-6 px-10'>
        <ButtonsRow currentTab={tab} />
      </div>

      <div className='mt-8 px-10 pb-10'>
        <Suspense fallback={<SpinLoader />} key={currentTab}>
          {currentTab === available_tabs.summary && (
            <SummaryServer id={id} data={data} />
          )}
          {currentTab === available_tabs.followup && <FollowUp />}
          {currentTab === available_tabs.transcript && (
            <TranscriptWrapper id={id} />
          )}
        </Suspense>
      </div>
    </Card>
  );
}
