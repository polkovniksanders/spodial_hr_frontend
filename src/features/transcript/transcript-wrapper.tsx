import { loadTranscriptChunk } from '@/app/actions/transcript-actions';
import { filters } from '@/features/transcript/lib/options';
import TranscriptHistory from '@/features/transcript/transcript-history';

async function getInitial({ id }: { id: string }) {
  const { data, totalCount } = await loadTranscriptChunk(
    id,
    0,
    filters.limit * 2,
  );
  return { initialData: data, initialTotal: totalCount };
}

export default async function TranscriptWrapper({ id }: { id: string }) {
  const { initialData, initialTotal } = await getInitial({
    id: id,
  });

  return (
    <TranscriptHistory
      eventId={id}
      initialData={initialData}
      initialTotal={initialTotal}
    />
  );
}
