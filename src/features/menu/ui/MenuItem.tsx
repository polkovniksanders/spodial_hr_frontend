'use client';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import type { MenuProps } from '@/features/menu/service/menu.interface';
import { Calendar } from 'lucide-react';

export default function MenuItem({ iconKey, route, name }: MenuProps) {
  const router = useRouter();
  const pathname = usePathname();

  const currentPathname = pathname.split('/').filter(Boolean).pop();
  const isActive = route === currentPathname;

  const ICONS = { calendar: Calendar };
  const Icon = ICONS[iconKey];

  const clickMenuItem = (route: string) => {
    if (!route || isActive) return;
    router.push(route);
  };

  return (
    <div
      onClick={() => clickMenuItem(route)}
      className={clsx(
        'flex px-[24px] py-[8px] rounded-[12px] items-center gap-2 transition-colors',
        isActive ? 'bg-white text-primary' : 'bg-transparent text-grey',
        'hover:cursor-pointer hover:text-grey hover:bg-hover',
      )}
    >
      <Icon size={18} />
      <span>{name}</span>
    </div>
  );
}
