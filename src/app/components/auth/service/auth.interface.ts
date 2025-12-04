import type { AUTH_TITLE_VARIANT } from '@/app/components/auth/lib/options';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  user: {
    token: string;
  };
}

export type AuthTitleVariant =
  (typeof AUTH_TITLE_VARIANT)[keyof typeof AUTH_TITLE_VARIANT];
