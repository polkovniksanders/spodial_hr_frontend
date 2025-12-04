import MenuButton from '@/app/components/menu/client/menu-button';
import { MENU } from '@/app/components/menu/lib/options';

export default function Menu() {
  return (
    <nav className='flex flex-col gap-2'>
      {MENU.map(item => (
        <MenuButton key={item.key} item={item} />
      ))}
    </nav>
  );
}
