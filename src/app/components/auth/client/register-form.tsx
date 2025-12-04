'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  BUTTON_TEXT,
  REGISTER_FIELDS,
  REGISTER_FIELDS_VALUES,
} from '@/app/components/auth/lib/options';
import FormFooter from '@/app/components/auth/server/form-footer';
import { VARIANT_MAPPER, type VariantType } from '@/shared/lib/fieldMapper';
import { ROUTES } from '@/shared/lib/routes';

import type { RegisterDTO } from '@/app/components/auth/service/auth.interface';

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
        return setError('email', { message: data.error });
      }

      router.replace(ROUTES.DASHBOARD.CALENDAR);
      router.refresh();
    } catch (error) {
      setError('email', { message: String(error) });
    }
  };

  const FORM_ID = 'register-form';

  return (
    <>
      <form
        id={FORM_ID}
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
        formId={FORM_ID}
        primaryButton={BUTTON_TEXT.GET_STARTED}
        primaryText={`${BUTTON_TEXT.LOGIN} here`}
        secondaryText={'Already have an account?'}
        secondaryRoute={ROUTES.AUTH.LOGIN}
      />
    </>
  );
}
