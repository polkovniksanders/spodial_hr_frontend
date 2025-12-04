import { notFound, redirect } from 'next/navigation';
import React, { Suspense } from 'react';

import { getSummary } from '@/app/components/event/lib/get-summary';
import EventOverview from '@/app/components/event/server/event-overview';
import FollowUp from '@/app/components/follow-up/server/follow-up';
import { available_tabs } from '@/app/components/meeting/lib/options';
import MeetingHeader from '@/app/components/meeting/ui/MeetingHeader';
import Transcript from '@/app/components/transcript/server/transcript';
import ButtonsRow from '@/components/ui/button/ButtonsRow';
import Card from '@/components/ui/card/Card';
import SpinLoader from '@/components/ui/layout/spin-loader';
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
            <EventOverview id={id} data={data} />
          )}
          {currentTab === available_tabs.followup && (
            <FollowUp id={Number(id)} />
          )}
          {currentTab === available_tabs.transcript && <Transcript id={id} />}
        </Suspense>
      </div>
    </Card>
  );
}
