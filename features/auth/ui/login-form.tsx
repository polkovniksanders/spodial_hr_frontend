'use client';

import React, { useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { login } from '@/app/actions/auth';
import { SIGN_IN_FIELDS, SIGN_IN_VALUES } from '@/features/auth/lib/fields';
import { BUTTON_TEXT } from '@/features/auth/lib/options';
import { VARIANT_MAPPER, type VariantType } from '@/shared/lib/fieldMapper';
import { ROUTES } from '@/shared/lib/routes';
import AuthFormFooter from '@/widgets/auth/ui/auth-form-footer';

import type { LoginDTO } from '@/features/auth/model/types';

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const { control, handleSubmit, setError } = useForm<LoginDTO>({
    defaultValues: SIGN_IN_VALUES,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: LoginDTO) => {
    startTransition(async () => {
      try {
        await login(data);
      } catch (error) {
        const err = error as {
          fieldErrors?: Partial<Record<keyof LoginDTO, string>>;
          message?: string;
        };

        if (err.fieldErrors) {
          for (const [field, message] of Object.entries(err.fieldErrors) as [
            keyof LoginDTO,
            string,
          ][]) {
            setError(field, { message });
          }
          return;
        }
      }
    });
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

      <AuthFormFooter
        loading={isPending}
        formId={FORM_ID}
        primaryButton={BUTTON_TEXT.GET_STARTED}
        primaryText={`${BUTTON_TEXT.LOGIN} here`}
        secondaryText={'Already have an account?'}
        secondaryRoute={ROUTES.AUTH.LOGIN}
      />
    </>
  );
}
