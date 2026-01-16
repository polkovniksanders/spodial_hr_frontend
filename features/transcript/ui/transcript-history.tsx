'use client';

import { useEffect, useRef, useState } from 'react';

import { loadTranscriptChunk } from '@/app/actions/transcript';
import { filters } from '@/features/transcript/lib/options';
import TranscriptList from '@/features/transcript/ui/transcript-list';
import SpinLoader from '@/shared/ui/layout/spin-loader';

import type { TranscriptsProps } from '@/features/transcript/model/types';

type Props = {
  eventId: string;
  initialData: TranscriptsProps;
  initialTotal: number;
};

export default function TranscriptHistory({
  eventId,
  initialData,
  initialTotal,
}: Props) {
  const [items, setItems] = useState(initialData.data);
  const [offset, setOffset] = useState(initialData.data.length);
  const [hasMore, setHasMore] = useState(
    initialData.data.length < initialTotal,
  );
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const { data, hasMore: more } = await loadTranscriptChunk(
        eventId,
        offset,
        filters.limit,
      );

      setItems(prev => [...prev, ...data.data]);
      setOffset(prev => prev + data.data.length);
      setHasMore(more);
    } catch (error) {
      console.error('Failed to load more', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          void loadMore();
        }
      },
      { rootMargin: '20px' },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, offset]);

  return (
    <div className='space-y-4'>
      <TranscriptList data={items} />

      {!hasMore && items.length > 0 ? (
        <div className='text-center text-gray-500'>
          Loaded: {items.length} (all) items
        </div>
      ) : (
        <div ref={sentinelRef} className='h-10' />
      )}

      {isLoading && <SpinLoader />}
    </div>
  );
}
