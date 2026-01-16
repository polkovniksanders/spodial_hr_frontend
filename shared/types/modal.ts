import type { ReactNode } from 'react';

export interface ModalContextValue {
  open?: (content: ReactNode) => void;
  close: () => void;
}
