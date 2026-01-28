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

type FieldErrors = {
  fieldErrors: Partial<Record<keyof LoginDTO, string>>;
};

const isFieldError = (error: unknown): error is FieldErrors =>
  typeof error === 'object' &&
  error !== null &&
  'fieldErrors' in error &&
  typeof (error as FieldErrors).fieldErrors === 'object';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Login failed. Please try again.';
};

const FORM_ID = 'login-form';

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginDTO>({
    defaultValues: SIGN_IN_VALUES,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: LoginDTO) => {
    startTransition(async () => {
      try {
        await login(data);
      } catch (error) {
        if (isFieldError(error)) {
          for (const [field, message] of Object.entries(error.fieldErrors) as [
            keyof LoginDTO,
            string,
          ][]) {
            setError(field, { message });
          }
          return;
        }

        setError('root', { message: getErrorMessage(error) });
      }
    });
  };

  return (
    <>
      <form
        id={FORM_ID}
        onSubmit={handleSubmit(onSubmit)}
        className='w-full flex flex-col gap-[30px]'
        aria-describedby={errors.root ? 'form-error' : undefined}
      >
        {errors.root?.message && (
          <p
            id='form-error'
            role='alert'
            aria-live='polite'
            className='text-sm text-red-700 text-center'
          >
            {errors.root.message}
          </p>
        )}
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
        primaryButton={BUTTON_TEXT.LOGIN}
        primaryText={`${BUTTON_TEXT.REGISTER}`}
        secondaryText={'Dont have an account?'}
        secondaryRoute={ROUTES.AUTH.REGISTER}
      />
    </>
  );
}
