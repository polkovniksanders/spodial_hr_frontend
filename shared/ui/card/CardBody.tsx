import type { PropsWithChildren } from 'react';

export default function CardBody({ children }: PropsWithChildren) {
  return <div className={'flex h-full flex-col px-8 py-6'}>{children}</div>;
}
