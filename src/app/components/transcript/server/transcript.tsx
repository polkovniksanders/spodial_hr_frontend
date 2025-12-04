import { loadTranscriptChunk } from '@/app/actions/transcript-actions';
import TranscriptHistory from '@/app/components/transcript/client/transcript-history';
import { filters } from '@/app/components/transcript/lib/options';

async function getInitial({ id }: { id: string }) {
  const { data, totalCount } = await loadTranscriptChunk(
    id,
    0,
    filters.limit * 2,
  );
  return { initialData: data, initialTotal: totalCount };
}

export default async function Transcript({ id }: { id: string }) {
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
