import type { PropsWithChildren } from 'react';

export default function Avatar({ children }: PropsWithChildren) {
  return (
    <div
      className={
        'flex items-center justify-center w-[40px] h-[40px] rounded-full bg-primary text-white capitalize'
      }
    >
      {children}
    </div>
  );
}
