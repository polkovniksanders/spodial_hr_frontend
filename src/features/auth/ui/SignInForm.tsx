import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button/Button';
import Input from '@/components/ui/input/Input';

type LoginFormValues = {
  email: string;
  password: string;
};

const fields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Введите email',
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль',
  },
];

export default function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('Submitted:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 w-full max-w-md'
    >
      {fields.map(field => (
        <Controller
          key={field.name}
          name={field.name as keyof LoginFormValues}
          control={control}
          rules={{
            required: `${field.label} обязателен`,
            ...(field.name === 'email' && {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Введите корректный email',
              },
            }),
          }}
          render={({ field: hookField, fieldState }) => (
            <Input
              {...hookField}
              label={field.label}
              type={field.type}
              error={fieldState.error?.message}
            />
          )}
        />
      ))}

      <Button type='submit'>Войти</Button>
    </form>
  );
}
