'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/ui/input/Input';
import {
  BUTTON_TEXT,
  SIGN_IN_FIELDS,
  SIGN_IN_VALUES,
} from '@/features/auth/utils/options';
import type { LoginDTO } from '@/features/auth/service/auth.interface';
import { Button } from '@/components/ui/button/Button';
import Link from 'next/link';
import { ROUTES } from '@/shared/utils/routes';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<LoginDTO>({
    defaultValues: SIGN_IN_VALUES,
  });

  const onSubmit = async (formData: LoginDTO) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Если сервер вернул ошибку, выводим её в консоль или в форму
        console.error('Register error:', data.error);

        // Пример: можно установить ошибку в поле 'email' или общую
        // setError('root', { message: data.error });
        return;
      }

      console.log('Registration success:', data);

      // Успех! Токен уже в куках, делаем редирект
      router.replace(ROUTES.DASHBOARD.CALENDAR);
      router.refresh(); // Обновляем роутер, чтобы серверные компоненты увидели новую куку
    } catch (err) {
      console.error('Network or unexpected error during register:', err);
    }
  };

  return (
    <>
      <form
        id='login-form'
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col gap-[30px]'
      >
        {SIGN_IN_FIELDS.map(field => (
          <Controller
            key={field.name}
            name={field.name as keyof LoginDTO}
            control={control}
            rules={field.rules}
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
      </form>

      <div className={'flex flex-col gap-3 mt-[30px]'}>
        <Button type={'submit'} form='login-form'>
          {BUTTON_TEXT.LOGIN}
        </Button>

        <Link href={ROUTES.AUTH.REGISTER}>
          <Button className={'w-full'} variant={'secondary'}>
            {BUTTON_TEXT.REGISTER}
          </Button>
        </Link>
      </div>
    </>
  );
}
