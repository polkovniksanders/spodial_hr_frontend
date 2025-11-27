import type { PropsWithChildren } from 'react';

export interface PopupComponentProps {
  width: number;
  onClose: () => void;
  top: number;
  left: number;
}

export interface PopupProps extends PropsWithChildren {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  className?: string;
}
