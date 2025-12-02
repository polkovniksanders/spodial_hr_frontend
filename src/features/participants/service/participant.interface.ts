export interface ParticipantProps {
  id: number;
  email: string;
}

export interface ParticipantEvent {
  calendar_event_id: number;
  id: number;
  name: string;
  profile?: null;
}

export interface AttendeeProps {
  variant: 'attendee';
  calendar_event_id: number;
  id: number;
  name: string;
}

export interface GuestProps {
  variant: 'guest';
  id: number;
  email: string;
}
