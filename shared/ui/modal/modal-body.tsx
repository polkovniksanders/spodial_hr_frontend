import type { PropsWithChildren } from 'react';

export default function ModalBody({ children }: PropsWithChildren) {
  if (!children) return null;

  return <div className={'px-7 py-4.5'}>{children}</div>;
}
