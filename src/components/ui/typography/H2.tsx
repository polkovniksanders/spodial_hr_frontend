import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function H2({ children, className = '' }: Props) {
  return (
    <div className={'max-w-full overflow-hidden'}>
      <h2
        style={{
          lineHeight: 'normal',
        }}
        className={`text-[36px] font-normal text-[#344137] font-inter truncate min-w-0 ${className}`}
      >
        {children}
      </h2>
    </div>
  );
}
