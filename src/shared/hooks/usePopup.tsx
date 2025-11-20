import { useEffect, useRef, useState } from 'react';

export const usePopup = () => {
  const [popupPos, setPopupPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setPopupPos(null);
      }
    };

    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  const openPopup = (e: MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPopupPos({
      top: rect.top + rect.height / 2,
      left: rect.left + rect.width / 2,
    });
  };

  const closePopup = () => {
    setPopupPos(null);
  };

  return { openPopup, closePopup, popupPos, popupRef };
};
