'use client';

import { type ReactNode, useState } from 'react';

import { ModalContext } from '@/shared/ui/modal/modal-context';
import { ModalRoot } from '@/shared/ui/modal/modal-root';

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode | null>(null);

  return (
    <ModalContext.Provider
      value={{
        open: setContent,
        close: () => setContent(null),
      }}
    >
      {children}
      <ModalRoot open={Boolean(content)} onClose={() => setContent(null)}>
        {content}
      </ModalRoot>
    </ModalContext.Provider>
  );
}
