'use client';

import React, { type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import GlobalPopup from '@/components/ui/layout/GlobalPopup';
import { store } from '@/store/store';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <GlobalPopup />
      {children}
    </Provider>
  );
}
