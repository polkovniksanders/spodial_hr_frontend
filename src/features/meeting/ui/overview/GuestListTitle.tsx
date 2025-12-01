import type { PropsWithChildren } from 'react';

export default function GuestListTitle({ children }: PropsWithChildren) {
  return <p className={'mb-[8px] text-[20px] text-[#818F85]'}>{children}</p>;
}
