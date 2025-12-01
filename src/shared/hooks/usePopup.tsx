// shared/hooks/usePopup.ts
'use client';

import { type ReactNode } from 'react';

type PopupOptions = {
  content: ReactNode;
  width?: number | string;
  preferredPosition?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
};

export type OpenPopup = (
  anchorEl: HTMLElement | null,
  options: PopupOptions,
) => void;

export function usePopup() {
  const open: OpenPopup = (anchorEl, options) => {
    if (!anchorEl) return;

    globalThis.dispatchEvent(
      new CustomEvent('open-global-popup', {
        detail: { anchorEl, ...options },
      }),
    );
  };

  const close = () => {
    globalThis.dispatchEvent(new CustomEvent('close-global-popup'));
  };

  return { open, close };
}
