'use client';

import { useEffect, useRef, useState } from 'react';

import { loadTranscriptChunk } from '@/app/actions/transcript-actions';
import TranscriptData from '@/features/transcript/transcript-data';

import type { TranscriptsProps } from '@/features/meeting/service/meeting.interface';

type Props = {
  eventId: string;
  initialData: TranscriptsProps;
  initialTotal: number;
};

export default function TranscriptClient({
  eventId,
  initialData,
  initialTotal,
}: Props) {
  // Храним только массив элементов
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
        50,
      );

      setItems(prev => [...prev, ...data]); // теперь prev — это массив
      setOffset(prev => prev + data.length);
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
          loadMore();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, offset]);

  return (
    <div className='space-y-4'>
      <TranscriptData data={items} />

      <div ref={sentinelRef} className='h-10' />

      {isLoading && <div className='text-center py-4'>Загрузка...</div>}
      {!hasMore && items.length > 0 && (
        <div className='text-center py-4 text-gray-500'>
          Loaded: {items.length} items
        </div>
      )}
    </div>
  );
}
