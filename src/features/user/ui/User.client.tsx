'use client';

import Avatar from '@/features/user/ui/Avatar';
import { usePopup } from '@/shared/hooks/usePopup';
import { UserMenuPopup } from '@/features/user/ui/UserMenuPopup';
import type { UserProps } from '@/features/user/lib/user.interface';

export default function UserClient({ name, email }: UserProps) {
  const { popupPos, openPopup, popupRef, closePopup, width } = usePopup();

  return (
    <div className={'flex gap-[8px] items-center justify-end mb-4'}>
      <div className={'flex flex-col text-right'}>
        <p className={'text-primary'}>{name}</p>
        <p className={'text-[#818F85]'}>{email}</p>
      </div>

      <div className={'cursor-pointer'} onClick={e => openPopup(e, 123)}>
        <Avatar>{name[0]}</Avatar>
      </div>

      {popupPos && (
        <UserMenuPopup
          ref={popupRef}
          width={width}
          onClose={closePopup}
          top={popupPos.top}
          left={popupPos.left}
        />
      )}
    </div>
  );
}
