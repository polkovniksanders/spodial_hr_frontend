import { MENU } from '@/features/menu/lib/options';
import MenuItem from '@/features/menu/ui/menu-item';

export default function MenuServer() {
  return (
    <nav className='flex flex-col gap-2'>
      {MENU.map(item => (
        <MenuItem key={item.key} item={item} />
      ))}
    </nav>
  );
}
