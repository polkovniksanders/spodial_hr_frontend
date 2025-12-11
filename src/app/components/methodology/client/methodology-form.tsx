'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  FORM_FIELDS,
  METHODOLOGY_FIELDS,
} from '@/app/components/methodology/lib/options';
import { Button } from '@/components/ui/button/Button';
import { VARIANT_MAPPER, type VariantType } from '@/shared/lib/fieldMapper';

import type { MethodologyDTO } from '@/app/components/methodology/service/methodology.interface';

const notify = () => {
  toast.success('Methodology added', {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: 'light',
  });
};

export default function MethodologyForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<MethodologyDTO>({
    defaultValues: METHODOLOGY_FIELDS,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: MethodologyDTO) => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/dashboard/methodology', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || 'Ошибка сохранения', {
          position: 'top-center',
          autoClose: 3000,
        });
        return;
      }

      notify();
      reset();
    } catch {
      toast.error('Сетевая ошибка', {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col flex-1 gap-4 pt-[24px] pb-[38px] pl-[24px] pr-[24px]'
    >
      {FORM_FIELDS.map(field => (
        <Controller
          key={field.name}
          name={field.name as keyof MethodologyDTO}
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
      <div className={'mt-auto w-[170px]'}>
        <Button loading={isLoading} disabled={isLoading} type='submit'>
          Save
        </Button>
      </div>
    </form>
  );
}
