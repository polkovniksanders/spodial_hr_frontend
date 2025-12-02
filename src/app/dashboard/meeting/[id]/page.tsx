import { Suspense } from 'react';

import ButtonsRow from '@/components/ui/button/ButtonsRow';
import Card from '@/components/ui/card/Card';
import SpinLoader from '@/components/ui/layout/spin-loader';
import { getSummary } from '@/features/meeting/service/get-summary';
import FollowUp from '@/features/meeting/ui/follow-up/follow-up';
import MeetingHeader from '@/features/meeting/ui/MeetingHeader';
import SummaryServer from '@/features/meeting/ui/overview/Summary.server';
import TranscriptWrapper from '@/features/transcript/transcript-wrapper';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { tab } = await searchParams;

  const summary = await getSummary(id);
  if (!summary) return null;
  const data = summary.data;

  return (
    <Card className='min-h-full h-full overflow-x-hidden overflow-y-scroll'>
      <MeetingHeader title={data.title} />

      <div className='my-6 px-10'>
        <ButtonsRow currentTab={tab} />
      </div>

      <div className='mt-8 px-10 '>
        {tab === 'summary' && <SummaryServer id={id} data={data} />}
        {tab === 'followup' && (
          <Suspense fallback={<SpinLoader />}>
            <FollowUp />
          </Suspense>
        )}
        {tab === 'transcript' && (
          <Suspense fallback={<SpinLoader />}>
            <TranscriptWrapper id={id} />{' '}
          </Suspense>
        )}
      </div>
    </Card>
  );
}
