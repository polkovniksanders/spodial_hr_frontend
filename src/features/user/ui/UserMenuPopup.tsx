import Popup from '@/components/ui/popup/Popup';
import { forwardRef } from 'react';
import { USER_MENU } from '@/features/user/lib/options';
import type { PopupComponentProps } from '@/components/ui/popup/popup.interface';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/lib/routes';

export const UserMenuPopup = forwardRef<HTMLDivElement, PopupComponentProps>(
  ({ width, onClose, top, left }, ref) => {
    const router = useRouter();

    const logout = async () => {
      try {
        const res = await fetch('/api/auth/logout', { method: 'POST' });

        if (!res.ok) {
          const data = await res.json();
          console.error('Logout error:', data.error);
          return;
        }

        router.refresh();
        router.push(ROUTES.AUTH.LOGIN);
      } catch (err) {
        console.error('Network error during logout:', err);
      }
    };

    return (
      <Popup top={top} left={left}>
        <div
          ref={ref}
          style={{ width: width }}
          className={'bg-white box-shadow-secondary rounded-[14px] px-6 py-2'}
        >
          <div className={'flex flex-col gap-2'}>
            {USER_MENU.map(menu => (
              <div onClick={logout} key={menu.id} className={'cursor-pointer'}>
                <p className={'text-primary'}>{menu.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Popup>
    );
  },
);
