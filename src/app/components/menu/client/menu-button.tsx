'use client';

import clsx from 'clsx';
import { Calendar } from 'lucide-react';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

import { ICONS } from '@/app/components/menu/lib/options';

import type { MenuProps } from '@/app/components/menu/service/menu.interface';

export default function MenuButton({ item }: { item: MenuProps }) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  const isActive = item.route === segment;

  const Icon = item.key
    ? (ICONS[item.key as keyof typeof ICONS] ?? Calendar)
    : null;

  return (
    <button
      type='button'
      onClick={() =>
        !isActive && item.route && router.push(`/dashboard/${item.route}`)
      }
      className={clsx(
        'cursor-pointer flex w-full items-center gap-2 rounded-[12px] px-6 py-2 text-left transition-colors',
        'hover:bg-hover-light',
        isActive ? 'bg-white text-accent' : 'text-secondary',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {Icon && <Icon size={18} aria-hidden='true' className='shrink-0' />}
      <span>{item.name}</span>
    </button>
  );
}
