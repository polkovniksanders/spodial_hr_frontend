import type { PropsWithChildren } from 'react';
import Logo from '@/features/logo/Logo';
import User from '@/features/user/widget/User';
import Menu from '@/features/menu/ui/Menu';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className={'bg-gradient-primary h-screen w-full flex flex-row p-5'}>
      <div className={'flex flex-col w-[228px] mr-5'}>
        <Logo />
        <Menu />
      </div>

      <div className={'flex flex-col w-full'}>
        <User />

        <div className={'h-screen'}>{children}</div>
      </div>
    </div>
  );
}
