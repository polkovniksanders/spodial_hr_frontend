import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setElementSize } from '@/store/elementSizesSlice';

export function useElementSize(id: string) {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ref.current) return;

    const update = () => {
      const height = ref.current!.offsetHeight;
      dispatch(setElementSize({ id, height }));
    };

    update();

    const observer = new ResizeObserver(() => update());
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [id, dispatch]);

  return ref;
}
