import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function H2({ children, className }: Props) {
  return (
    <h1
      style={{
        lineHeight: 'normal',
      }}
      className={`text-[36px] font-normal text-[#344137] font-inter ${className}`}
    >
      {children}
    </h1>
  );
}
