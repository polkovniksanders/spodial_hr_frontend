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
}

export function Button({
  children,
  variant = BUTTON_VARIANT.primary,
  className,
  ...rest
}: Props) {
  const base =
    'h-[56px] w-full px-6 py-3 rounded-full font-inter text-base transition cursor-pointer';

  const variants = {
    [BUTTON_VARIANT.primary]: 'bg-[#4FB268] text-white',
    [BUTTON_VARIANT.secondary]:
      'border border-[#4FB268] text-[#4FB268] bg-transparent',
  };

  return (
    <Border>
      <button className={clsx(base, variants[variant], className)} {...rest}>
        {children}
      </button>
    </Border>
  );
}
