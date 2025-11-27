import React, { type PropsWithChildren } from 'react';
import Opacity from '@/components/ui/animation/Opacity';

export default function Error({ children }: PropsWithChildren) {
  return (
    <Opacity>
      <p className='mt-1 text-sm text-red-700' role='alert' aria-live='polite'>
        {children}
      </p>
    </Opacity>
  );
}
