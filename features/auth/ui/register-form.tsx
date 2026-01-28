'use client';

import React, { useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { register } from '@/app/actions/auth';
import {
  REGISTER_FIELDS,
  REGISTER_FIELDS_VALUES,
} from '@/features/auth/lib/fields';
import { BUTTON_TEXT } from '@/features/auth/lib/options';
import { VARIANT_MAPPER, type VariantType } from '@/shared/lib/fieldMapper';
import { ROUTES } from '@/shared/lib/routes';
import AuthFormFooter from '@/widgets/auth/ui/auth-form-footer';

import type { RegisterDTO } from '@/features/auth/model/types';

type FieldErrors = {
  fieldErrors: Partial<Record<keyof RegisterDTO, string>>;
};

const isFieldError = (error: unknown): error is FieldErrors =>
  typeof error === 'object' &&
  error !== null &&
  'fieldErrors' in error &&
  typeof (error as FieldErrors).fieldErrors === 'object';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Registration failed. Please try again.';
};

const FORM_ID = 'register-form';

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterDTO>({
    defaultValues: REGISTER_FIELDS_VALUES,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: RegisterDTO) => {
    startTransition(async () => {
      try {
        await register(data);
      } catch (error) {
        if (isFieldError(error)) {
          for (const [field, message] of Object.entries(error.fieldErrors) as [
            keyof RegisterDTO,
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
