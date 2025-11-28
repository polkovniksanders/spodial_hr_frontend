'use client';

import React, { type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

export default function Providers({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
