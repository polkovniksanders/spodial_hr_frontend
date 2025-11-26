'use client';

import Avatar from '@/features/user/ui/Avatar';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/utils/routes';

export default function User() {
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });

      if (!res.ok) {
        const data = await res.json();
        console.error('Logout error:', data.error);
        return;
      }

      // После logout обновляем серверный компонент
      router.refresh();
      router.push(ROUTES.AUTH.LOGIN);
    } catch (err) {
      console.error('Network error during logout:', err);
    }
  };

  return (
    <div className={'flex gap-[8px] items-center justify-end mb-4'}>
      <div className={'flex flex-col text-right'}>
        <p className={'text-primary'}>Robert</p>
        <p className={'text-[#818F85]'}>Robert34@gmail.com</p>
      </div>
      <Avatar />

      <div onClick={logout}>
        <LogOut />
      </div>
    </div>
  );
}
