'use client';

import { MENU } from '@/features/menu/utils/options';
import MenuItem from '@/features/menu/ui/MenuItem';

export default function Menu() {
  return (
    <div className={'flex flex-col gap-2'}>
      {MENU.map(item => {
        const { key, ...rest } = item;
        return <MenuItem key={key} {...rest} />;
      })}
    </div>
  );
}
