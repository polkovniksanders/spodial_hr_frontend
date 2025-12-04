'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  BUTTON_TEXT,
  SIGN_IN_FIELDS,
  SIGN_IN_VALUES,
} from '@/app/components/auth/lib/options';
import FormFooter from '@/app/components/auth/server/form-footer';
import { VARIANT_MAPPER, type VariantType } from '@/shared/lib/fieldMapper';
import { ROUTES } from '@/shared/lib/routes';

import type { LoginDTO } from '@/app/components/auth/service/auth.interface';

export default function LoginForm() {
  const router = useRouter();

  const { control, handleSubmit, setError } = useForm<LoginDTO>({
    defaultValues: SIGN_IN_VALUES,
    mode: 'onBlur',
    reValidateMode: 'onChange',
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
        return setError('email', { message: data.error });
      }

      router.replace(ROUTES.DASHBOARD.CALENDAR);
      router.refresh();
    } catch {}
  };

  const FORM_ID = 'login-form';

  return (
    <>
      <form
        id={FORM_ID}
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col gap-[30px]'
      >
        {SIGN_IN_FIELDS.map(field => (
          <Controller
            key={field.name}
            name={field.name as keyof LoginDTO}
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
        primaryButton={BUTTON_TEXT.LOGIN}
        primaryText={BUTTON_TEXT.REGISTER}
        secondaryText={"Don't have an account?"}
        secondaryRoute={ROUTES.AUTH.REGISTER}
      />
    </>
  );
}
