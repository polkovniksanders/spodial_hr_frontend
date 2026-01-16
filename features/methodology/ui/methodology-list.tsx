import MethodologyItem from '@/features/methodology/ui/methodology-item';

import type { MethodologyProps } from '@/features/methodology/model/types';

export default function MethodologyList({
  data,
}: {
  data: MethodologyProps[];
}) {
  return (
    <>
      {data.map(methodology => (
        <MethodologyItem key={methodology.id} methodology={methodology} />
      ))}
    </>
  );
}
