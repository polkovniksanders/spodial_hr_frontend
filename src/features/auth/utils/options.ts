export const SIGN_IN_FIELDS = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Введите email',
    rules: {
      required: 'Email обязателен',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Введите корректный email',
      },
    },
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль',
    rules: {
      required: 'Пароль обязателен',
      minLength: {
        value: 6,
        message: 'Минимальная длина пароля 6 символов',
      },
    },
  },
];

export const SIGN_IN_VALUES = {
  email: '',
  password: '',
};

export const REGISTER_FIELDS = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Name',
    rules: {
      required: 'Name обязателен',
      minLength: {
        value: 6,
        message: 'Минимальная длина пароля 6 символов',
      },
    },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Введите email',
    rules: {
      required: 'Email обязателен',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Введите корректный email',
      },
    },
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль',
    rules: {
      required: 'Пароль обязателен',
      minLength: {
        value: 6,
        message: 'Минимальная длина пароля 6 символов',
      },
    },
  },
  {
    name: 'acceptTerms',
    label: 'Согласен с условиями',
    type: 'checkbox',
    rules: {
      required: 'Необходимо согласие',
    },
  },
];

export const REGISTER_FIELDS_VALUES = {
  name: '',
  email: '',
  password: '',
};

export const BUTTON_TEXT = {
  LOGIN: 'Log In',
  REGISTER: 'Register',
  GET_STARTED: 'Get Started',
} as const;

export const AUTH_TITLE_VARIANT = {
  SIGN_IN: 'auth',
  REGISTER: 'register',
};
