export const BUTTON_TEXT = {
  LOGIN: 'Log In',
  REGISTER: 'Register',
  GET_STARTED: 'Get Started',
} as const;

export const AUTH_TITLE_VARIANT = {
  SIGN_IN: 'auth',
  REGISTER: 'register',
  ORGANIZATION: 'organization',
};

export type AuthTitleVariant =
  (typeof AUTH_TITLE_VARIANT)[keyof typeof AUTH_TITLE_VARIANT];
