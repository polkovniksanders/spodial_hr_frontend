import MethodologyItem from '@/features/methodology/ui/methodology-item';

import type { MethodologyProps } from '@/features/methodology/model/types';

export default function MethodologyList({
  data,
}: {
  data: MethodologyProps[];
}) {
  if (!data) return null;

  console.log('data', data);

  return (
    <>
      {data.map(methodology => (
        <MethodologyItem key={methodology.id} methodology={methodology} />
      ))}
    </>
  );
}
