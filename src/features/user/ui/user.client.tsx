'use client';

import React, { useRef } from 'react';

import Avatar from '@/features/user/ui/avatar';
import { UserMenuPopup } from '@/features/user/ui/user-menu-popup';
import { usePopup } from '@/shared/hooks/usePopup';

import type { UserProps } from '@/features/user/service/user.interface';

export default function UserClient({ name, email }: UserProps) {
  const anchorRef = useRef<HTMLDivElement>(null);

  const { open } = usePopup();

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!anchorRef.current) {
      return;
    }

    open(anchorRef.current, {
      width: 123,
      preferredPosition: 'bottom',
      content: <UserMenuPopup />,
    });
  };

  return (
    <div className={'flex gap-[8px] items-center justify-end mb-4'}>
      <div ref={anchorRef} className={'flex flex-col text-right'}>
        <p className={'text-primary'}>{name}</p>
        <p className={'text-[#818F85]'}>{email}</p>
      </div>

      <button onClick={handleOpen} className={'cursor-pointer'}>
        <Avatar>{name[0]}</Avatar>
      </button>
    </div>
  );
}
