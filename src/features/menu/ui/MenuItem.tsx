'use client';

import clsx from 'clsx';
import { Calendar } from 'lucide-react';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

import { ICONS } from '@/features/menu/lib/options';

import type { MenuProps } from '@/features/menu/service/menu.interface';

export default function MenuItem({ item }: { item: MenuProps }) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  const isActive = item.route === segment;

  const Icon = item.iconKey
    ? (ICONS[item.iconKey as keyof typeof ICONS] ?? Calendar)
    : null;

  return (
    <button
      type='button'
      onClick={() => !isActive && item.route && router.push(item.route)}
      className={clsx(
        'cursor-pointer flex w-full items-center gap-2 rounded-[12px] px-6 py-2 text-left transition-colors',
        'hover:bg-hover',
        isActive ? 'bg-white text-primary' : 'text-grey',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {Icon && <Icon size={18} aria-hidden='true' className='shrink-0' />}
      <span>{item.name}</span>
    </button>
  );
}
