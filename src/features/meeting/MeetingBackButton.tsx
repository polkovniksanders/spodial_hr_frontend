'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='cursor-pointer text-primary'
      aria-label='Назад'
    >
      <ChevronLeft size={36} />
    </button>
  );
}
