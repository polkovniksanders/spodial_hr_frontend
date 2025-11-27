'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import type { RegisterDTO } from '@/features/auth/service/auth.interface';
import {
  BUTTON_TEXT,
  REGISTER_FIELDS,
  REGISTER_FIELDS_VALUES,
} from '@/features/auth/utils/options';
import { ROUTES } from '@/shared/utils/routes';
import { VARIANT_MAPPER, type VariantType } from '@/shared/utils/fieldMapper';
import React from 'react';
import FormFooter from '@/features/auth/ui/FormFooter'; // Для редиректа в App Router.

export default function RegisterForm() {
  const router = useRouter();

  const { control, handleSubmit, setError } = useForm<RegisterDTO>({
    defaultValues: REGISTER_FIELDS_VALUES,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (formData: RegisterDTO) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log('data.error ', data.error);
        setError('email', { message: data.error });
        return;
      }

      router.replace(ROUTES.DASHBOARD.CALENDAR);
      router.refresh();
    } catch (err) {
      console.log('err', err);
      setError('email', { message: String(err) });
    }
  };

  return (
    <>
      <form
        id='register-form'
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col gap-[30px]'
      >
        {REGISTER_FIELDS.map(field => (
          <Controller
            key={field.name}
            name={field.name as keyof RegisterDTO}
            control={control}
            rules={field.rules}
            render={({ field: hookField, fieldState }) => {
              const variant: VariantType = field.variant;
              const Component = VARIANT_MAPPER[variant];

              return (
                <Component
                  field={hookField}
                  fieldState={fieldState}
                  config={field}
                />
              );
            }}
          />
        ))}
      </form>

      <FormFooter
        primaryButton={BUTTON_TEXT.GET_STARTED}
        primaryText={`${BUTTON_TEXT.LOGIN} here`}
        secondaryText={'Already have an account?'}
        secondaryRoute={ROUTES.AUTH.LOGIN}
      />
    </>
  );
}
