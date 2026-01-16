import { NestedMenuItem } from '@/features/menu/ui/menu-nested-item';

import type { MenuProps } from '@/features/menu/model/types';

export function MenuNested({ items }: { items: MenuProps[] }) {
  return items.map(item => (
    <NestedMenuItem key={item.id} item={item} level={0} />
  ));
}
