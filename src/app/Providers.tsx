'use client';

import React, { type PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import GlobalPopup from '@/components/ui/layout/global-popup';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalPopup />
      <ToastContainer />
      {children}
    </>
  );
}
