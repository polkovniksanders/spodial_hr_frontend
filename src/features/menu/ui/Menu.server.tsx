import MenuItem from './MenuItem';
import { MENU } from '@/features/menu/utils/options';

export default function MenuServer() {
  return (
    <nav className='flex flex-col gap-2'>
      {MENU.map(item => (
        <MenuItem {...item} />
      ))}
    </nav>
  );
}
