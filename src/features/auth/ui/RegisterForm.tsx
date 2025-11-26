'use client';

import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { RegisterDTO } from '@/features/auth/service/auth.interface';
import {
  BUTTON_TEXT,
  REGISTER_FIELDS,
  REGISTER_FIELDS_VALUES,
} from '@/features/auth/utils/options';
import Input from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import { ROUTES } from '@/shared/utils/routes'; // Для редиректа в App Router.

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
            render={({ field: hookField, fieldState }) =>
              field.type === 'checkbox' ? (
                <div className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={!!hookField.value}
                    onChange={e => hookField.onChange(e.target.checked)}
                    id={field.name}
                  />
                  <label htmlFor={field.name}>{field.label}</label>
                  {fieldState.error && (
                    <span className='text-red-500 text-sm'>
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              ) : (
                // Убедись, что компонент Input поддерживает пропсы
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

      <div className={'flex flex-col gap-3 mt-[30px]'}>
        <Button type='submit' form='register-form'>
          {BUTTON_TEXT.GET_STARTED}
        </Button>

        <Link href={ROUTES.AUTH.SIGN_IN} className='w-full'>
          <Button className={'w-full'} variant={'secondary'}>
            {BUTTON_TEXT.LOGIN}
          </Button>
        </Link>
      </div>
    </>
  );
}
