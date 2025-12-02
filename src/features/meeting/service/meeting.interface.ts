import type { ParticipantEvent } from '@/features/participants/service/participant.interface';

export interface SummaryProps {
  starts_at: string;
  url: string;
  title: string;
  guest: string;
}

export interface TranscriptsProps {
  data: TranscriptProps[];
  message: string;
  meta: [];
  status: number;
  success: boolean;
}

export interface TranscriptProps {
  end_absolute: string;
  end_relative: string;
  id: number;
  participant: ParticipantEvent;
  start_absolute: string;
  start_relative: string;
  text: string;
}
