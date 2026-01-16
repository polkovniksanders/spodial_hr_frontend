import { useTransition } from 'react';

import { logout } from '@/app/actions/auth';
import { USER_MENU } from '@/features/user/lib/options';

export const UserMenuPopup = () => {
  const [, startTransition] = useTransition();

  const onLogout = () => {
    startTransition(async () => {
      try {
        await logout();
      } catch {}
    });
  };

  return (
    <div className={'bg-white box-shadow-secondary rounded-[14px] px-6 py-2'}>
      <div className={'flex flex-col gap-2'}>
        {USER_MENU.map(menu => (
          <div onClick={onLogout} key={menu.id} className={'cursor-pointer'}>
            <p className={'text-primary'}>{menu.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
