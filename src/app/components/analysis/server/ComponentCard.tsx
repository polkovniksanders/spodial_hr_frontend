import type { PropsWithChildren } from 'react';

export default function ComponentCard({ children }: PropsWithChildren) {
  return (
    <div className={'bg-layout border-table rounded-2xl p-4'}>{children}</div>
  );
}
