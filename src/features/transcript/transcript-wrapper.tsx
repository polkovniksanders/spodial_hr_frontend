import { Suspense } from 'react';

import { loadTranscriptChunk } from '@/app/dashboard/meeting/[id]/transcript-actions';
import SpinLoader from '@/components/ui/layout/spin-loader';
import TranscriptClient from '@/features/transcript/transcript.client';

async function TranscriptInitialServer({ id }: { id: string }) {
  const { data, totalCount } = await loadTranscriptChunk(id, 0, 50);
  return { initialData: data, initialTotal: totalCount };
}

export default async function TranscriptWrapper({ id }: { id: string }) {
  const { initialData, initialTotal } = await TranscriptInitialServer({
    id: id,
  });

  return (
    <Suspense fallback={<SpinLoader />}>
      <TranscriptClient
        eventId={id}
        initialData={initialData}
        initialTotal={initialTotal}
      />
    </Suspense>
  );
}
