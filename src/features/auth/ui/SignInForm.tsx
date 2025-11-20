'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/ui/input/Input';
import { SIGN_IN_FIELDS, SIGN_IN_VALUES } from '@/features/auth/utils/options';
import type { SignInDTO } from '@/features/auth/service/auth.interface';

export default function SignInForm() {
  const { control, handleSubmit } = useForm<SignInDTO>({
    defaultValues: SIGN_IN_VALUES,
  });

  const onSubmit = (data: SignInDTO) => {
    console.log('Submitted:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-[30px]'
    >
      {SIGN_IN_FIELDS.map(field => (
        <Controller
          key={field.name}
          name={field.name as keyof SignInDTO}
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
  );
}
