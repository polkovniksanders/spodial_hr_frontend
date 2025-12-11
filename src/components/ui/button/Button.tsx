import clsx from 'clsx';

import Border from '@/components/ui/animation/Border';
import {
  BUTTON_VARIANT,
  type ButtonVariant,
} from '@/components/ui/button/button.interface';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  loading?: boolean;
  loadingText?: string;
}

const Loader = ({ text }: { text: string }) => (
  <div className='flex items-center justify-center gap-2'>
    <div className='animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent' />
    <p>{text}</p>
  </div>
);

export function Button({
  loadingText = 'Please, wait',
  children,
  variant = BUTTON_VARIANT.primary,
  className,
  loading = false,
  disabled = false,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;

  const base =
    'relative h-[56px] w-full px-6 py-3 rounded-full font-inter text-base font-medium transition-all duration-200 flex items-center justify-center gap-3';

  const variants = {
    [BUTTON_VARIANT.primary]: clsx(
      'bg-[#4FB268] cursor-pointer text-white hover:bg-[#45a05a] active:bg-[#3d8f50]',
      disabled && 'bg-[#A0D9B0] text-white/70 cursor-not-allowed',
      loading && 'cursor-wait',
    ),
    [BUTTON_VARIANT.secondary]: clsx(
      'border-2 cursor-pointer border-[#4FB268] text-[#4FB268] bg-transparent hover:bg-[#4FB268]/5 active:bg-[#4FB268]/10',
      disabled && 'border-[#A0D9B0] text-[#A0D9B0] cursor-not-allowed',
      loading && 'cursor-wait',
    ),
  };

  return (
    <Border>
      <button
        className={clsx(base, variants[variant], className)}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...rest}
      >
        {loading ? <Loader text={loadingText} /> : children}
      </button>
    </Border>
  );
}
