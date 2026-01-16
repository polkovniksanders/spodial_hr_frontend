export interface UserProps {
  email: string;
  email_verified_at: Date;
  id: number;
  name: string;

  readonly created_at: Date;
  readonly updated_at: Date;
}
