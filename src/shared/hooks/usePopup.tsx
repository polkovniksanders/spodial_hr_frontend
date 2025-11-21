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

  const openPopup = (
    e: React.MouseEvent<HTMLDivElement>,
    popupWidth: number,
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    console.log(rect);

    const windowWidth = window.innerWidth;

    console.log('windowWidth', windowWidth);

    setPopupPos({
      top: rect.top + rect.height / 2,
      left: rect.left + popupWidth - 228,
      // left: rect.left + popupWidth,
    });
  };

  const closePopup = () => {
    setPopupPos(null);
  };

  return { openPopup, closePopup, popupPos, popupRef };
};
