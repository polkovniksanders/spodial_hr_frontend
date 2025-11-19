import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      className={
        'bg-green-gradient h-screen w-full flex justify-center items-center'
      }
    >
      {children}
    </div>
  );
}
