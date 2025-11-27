import type { PropsWithChildren } from 'react';
import Logo from '@/features/logo/Logo';
import MenuServer from '@/features/menu/ui/Menu.server';
import UserServer from '@/features/user/ui/User.server';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className={'bg-gradient-primary h-screen w-full flex flex-row p-5'}>
      <div className={'flex flex-col w-[228px] mr-5'}>
        <Logo />
        <MenuServer />
      </div>

      <div className={'flex flex-col w-full'}>
        <UserServer />
        <div className={'h-screen'}>{children}</div>
      </div>
    </div>
  );
}
