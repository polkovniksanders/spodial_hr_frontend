'use client';

import React, { useRef } from 'react';

import { UserMenuPopup } from '@/features/user/ui/user-menu-popup';
import { usePopup } from '@/shared/hooks/usePopup';
import Avatar from '@/shared/ui/common/avatar';

import type { UserProps } from '@/features/user/model/types';

export default function UserInfo({ name, email }: UserProps) {
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
    <div className={'flex gap-[8px] items-center justify-end'}>
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
