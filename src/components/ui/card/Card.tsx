import type { PropsWithChildren } from 'react';

export default function Card({ children }: PropsWithChildren) {
  return (
    <div className={'rounded-[40px] bg-white box-shadow-common'}>
      {children}
    </div>
  );
}
