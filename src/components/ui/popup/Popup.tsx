import type { PopupProps } from '@/components/ui/popup/popup.interface';

export default function Popup({
  children,
  top,
  left,
  right,
  bottom,
  className,
}: PopupProps) {
  return (
    <div
      className={`absolute z-50 ${className ?? ''}`}
      style={{
        top,
        left,
        right,
        bottom,
      }}
    >
      {children}
    </div>
  );
}
