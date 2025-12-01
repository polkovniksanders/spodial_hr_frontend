import { MENU } from '@/features/menu/lib/options';

import MenuItem from './MenuItem';

export default function MenuServer() {
  return (
    <nav className='flex flex-col gap-2'>
      {MENU.map(item => (
        <MenuItem key={item.key} item={item} />
      ))}
    </nav>
  );
}
