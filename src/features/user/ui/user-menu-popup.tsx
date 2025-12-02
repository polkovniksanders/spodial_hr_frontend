import { useRouter } from 'next/navigation';

import { USER_MENU } from '@/features/user/lib/options';
import { ROUTES } from '@/shared/lib/routes';

export const UserMenuPopup = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });

      if (!res.ok) {
        return;
      }

      onClose?.();
      router.refresh();
      router.push(ROUTES.AUTH.LOGIN);
    } catch {}
  };

  return (
    <div className={'bg-white box-shadow-secondary rounded-[14px] px-6 py-2'}>
      <div className={'flex flex-col gap-2'}>
        {USER_MENU.map(menu => (
          <div onClick={logout} key={menu.id} className={'cursor-pointer'}>
            <p className={'text-primary'}>{menu.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
