'use client';

import React, { type PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import GlobalPopup from '@/shared/ui/layout/global-popup';

import { ModalProvider } from './providers/ModalProvider';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalPopup />
      <ToastContainer />
      <ModalProvider>{children}</ModalProvider>
    </>
  );
}
