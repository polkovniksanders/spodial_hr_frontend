import React, { type PropsWithChildren } from 'react';

import LogoImage from '@/features/logo/logo-image';
import MenuServer from '@/features/menu/ui/menu.server';
import UserServer from '@/features/user/ui/user.server';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className={'bg-gradient-primary h-full w-full flex flex-row p-5'}>
      <div className={'flex flex-col w-[228px] mr-5'}>
        <LogoImage />
        <MenuServer />
      </div>

      <div className={'flex flex-col flex-1 min-w-0'}>
        <UserServer />
        <div className={'min-h-screen'}>{children}</div>
      </div>
    </div>
  );
}
