'use client';

import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { useElementSize } from '@/shared/hooks/useElementSize';

interface Props extends PropsWithChildren {
  className?: string;
}

export default function Card({ children, className }: Props) {
  const ref = useElementSize('cardContent');

  return (
    <div
      ref={ref}
      className={clsx('rounded-[40px] bg-white box-shadow-primary', className)}
    >
      {children}
    </div>
  );
}
