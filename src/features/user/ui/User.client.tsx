'use client';

import Avatar from '@/features/user/ui/Avatar';
import { UserMenuPopup } from '@/features/user/ui/UserMenuPopup';

import type { UserProps } from '@/features/user/lib/user.interface';

export default function UserClient({ name, email }: UserProps) {
  return (
    <div className={'flex gap-[8px] items-center justify-end mb-4'}>
      <div className={'flex flex-col text-right'}>
        <p className={'text-primary'}>{name}</p>
        <p className={'text-[#818F85]'}>{email}</p>
      </div>

      <div className={'cursor-pointer'}>
        <Avatar>{name[0]}</Avatar>
      </div>

      <UserMenuPopup />
    </div>
  );
}
