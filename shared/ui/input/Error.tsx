import React, { type PropsWithChildren } from 'react';

// eslint-disable-next-line sonarjs/no-globals-shadowing
export default function Error({ children }: PropsWithChildren) {
  return (
    <p className='mt-1 text-sm text-red-700' role='alert' aria-live='polite'>
      {children}
    </p>
  );
}
