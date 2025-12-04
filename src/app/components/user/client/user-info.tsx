'use client';

import React, { useRef } from 'react';

import { UserMenuPopup } from '@/app/components/user/client/user-menu-popup';
import Avatar from '@/components/ui/common/avatar';
import { usePopup } from '@/shared/hooks/usePopup';

import type { UserProps } from '@/app/components/user/service/user.interface';

export default function UserInfo({ name, email }: UserProps) {
  const anchorRef = useRef<HTMLDivElement>(null);

  const { open, close } = usePopup();

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!anchorRef.current) {
      return;
    }

    open(anchorRef.current, {
      width: 123,
      preferredPosition: 'bottom',
      content: <UserMenuPopup onClose={close} />,
    });
  };

  return (
    <div className={'flex gap-[8px] items-center justify-end mb-4'}>
      <div ref={anchorRef} className={'flex flex-col text-right'}>
        <p className={'text-accent'}>{name}</p>
        <p className={'text-secondary'}>{email}</p>
      </div>

      <button onClick={handleOpen} className={'cursor-pointer'}>
        <Avatar>{name[0]}</Avatar>
      </button>
    </div>
  );
}
