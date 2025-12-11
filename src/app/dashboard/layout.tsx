import React, { type PropsWithChildren } from 'react';

import Menu from '@/app/components/menu/server/menu';
import User from '@/app/components/user/server/user';
import LogoImage from '@/components/logo/logo-image';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className='bg-gradient-primary min-h-screen w-full flex flex-row'>
      <aside className='flex flex-col flex-1 min-w-0 h-screen max-w-[238px] w-[238px] py-4 pl-4 pr-0'>
        <div className='flex flex-col  flex-shrink-0 pl-4 mb-4'>
          <LogoImage />
        </div>

        <Menu />
      </aside>

      <main className='flex flex-col flex-1 min-w-0 h-screen py-4 px-4'>
        <header className='flex-shrink-0 mb-4'>
          <User />
        </header>

        <div className='flex-1 min-h-0'>{children}</div>
      </main>
    </div>
  );
}
