import Input from '@/components/ui/input/Input';

import type { AttendeeProps } from '@/features/participants/service/participant.interface';

export default function Matching({ items }: { items: AttendeeProps[] }) {
  console.log('items', items);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <Input value={item.name} />
        </div>
      ))}
    </div>
  );
}
