import { getTranscript } from '@/features/meeting/service/get-transcript';
import Transcript from '@/features/meeting/ui/transcript/Transcript';

export async function TranscriptServer({ id }: { id: string }) {
  const response = await getTranscript(id);
  if (!response) return null;
  const data = response.data;
  if (!data) return null;

  return <Transcript data={data} />;
}
