import React, { type PropsWithChildren } from 'react';

import Menu from '@/app/components/menu/server/menu';
import User from '@/app/components/user/server/user';
import LogoImage from '@/components/logo/logo-image';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className={'bg-gradient-primary h-full w-full flex flex-row p-5'}>
      <div className={'flex flex-col w-[228px] mr-5'}>
        <LogoImage />
        <Menu />
      </div>

      <div className={'flex flex-col flex-1 min-w-0'}>
        <User />
        <div className={'min-h-screen'}>{children}</div>
      </div>
    </div>
  );
}
