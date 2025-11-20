'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/ui/input/Input';
import {
  REGISTER_FIELDS,
  REGISTER_FIELDS_VALUES,
} from '@/features/auth/utils/options';
import type { RegisterDTO } from '@/features/auth/service/auth.interface';

export default function RegisterForm() {
  const { control, handleSubmit } = useForm<RegisterDTO>({
    defaultValues: REGISTER_FIELDS_VALUES,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: RegisterDTO) => {
    console.log('Submitted:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-[30px]'
    >
      {REGISTER_FIELDS.map(field => (
        <Controller
          key={field.name}
          name={field.name as keyof RegisterDTO}
          control={control}
          rules={field.rules}
          render={({ field: hookField, fieldState }) =>
            field.type === 'checkbox' ? (
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={hookField.value || false}
                  onChange={e => hookField.onChange(e.target.checked)}
                />
                <label>{field.label}</label>
                {fieldState.error && (
                  <span className='text-red-500 text-sm'>
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            ) : (
              <Input
                {...hookField}
                label={field.label}
                type={field.type}
                error={fieldState.error?.message}
              />
            )
          }
        />
      ))}
    </form>
  );
}
