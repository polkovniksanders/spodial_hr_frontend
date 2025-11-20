import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  className?: string;
}>;

export default function Popup({
  children,
  top,
  left,
  right,
  bottom,
  className,
}: Props) {
  return (
    <div
      className={`absolute z-50 ${className ?? ''}`}
      style={{
        top,
        left,
        right,
        bottom,
      }}
    >
      {children}
    </div>
  );
}
