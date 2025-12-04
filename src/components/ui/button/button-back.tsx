'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ButtonBack() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='cursor-pointer text-accent'
      aria-label='Back'
    >
      <ChevronLeft size={36} />
    </button>
  );
}
