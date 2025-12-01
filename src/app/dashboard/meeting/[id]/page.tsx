import { Suspense } from 'react';

import ButtonsRow from '@/components/ui/button/ButtonsRow';
import Card from '@/components/ui/card/Card';
import SpinLoader from '@/components/ui/layout/SpinLoader';
import FollowUp from '@/features/meeting/ui/follow-up/FollowUp';
import MeetingHeader from '@/features/meeting/ui/MeetingHeader';
import SummaryServer from '@/features/meeting/ui/overview/Summary.server';
import { TranscriptServer } from '@/features/meeting/ui/transcript/Transcript.server';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { tab } = await searchParams;

  return (
    <Card className='min-h-full h-full'>
      <MeetingHeader />

      <div className='my-6 px-10'>
        <ButtonsRow currentTab={tab} />
      </div>

      <div className='mt-8 px-10'>
        {tab === 'summary' && (
          <Suspense fallback={<SpinLoader />}>
            <SummaryServer id={id} />
          </Suspense>
        )}
        {tab === 'followup' && (
          <Suspense fallback={<SpinLoader />}>
            <FollowUp />
          </Suspense>
        )}
        {tab === 'transcript' && (
          <Suspense fallback={<SpinLoader />}>
            <TranscriptServer id={id} />
          </Suspense>
        )}
      </div>
    </Card>
  );
}
