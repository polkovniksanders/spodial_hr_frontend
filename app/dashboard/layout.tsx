import React, { type PropsWithChildren } from 'react';

import MenuSidebar from '@/features/menu/ui/menu-sidebar';
import OrganizationSelector from '@/features/organization/ui/organization-selector';
import User from '@/features/user/ui/user';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className='bg-gradient-primary min-h-screen w-full flex flex-row'>
      <aside className='flex flex-col flex-1 min-w-0 h-screen max-w-[238px] w-[238px] py-4 pl-4 pr-0'>
        <div className='flex flex-col  flex-shrink-0 pl-4 mb-4'>
          <div
            className={
              'w-full h-[50px] rounded-full  flex justify-center items-center radius-full border-primary text-primary'
            }
          >
            logo
          </div>
        </div>

        <MenuSidebar />
      </aside>

      <main className='flex flex-col flex-1 min-w-0 h-screen py-4 px-4'>
        <header className='flex-shrink-0 mb-4 flex flex-row justify-between items-center'>
          <OrganizationSelector />
          <User />
        </header>

        <div className='flex-1 min-h-0'>{children}</div>
      </main>
    </div>
  );
}
