// components/LinearProgress.tsx
import type { ComponentProps } from 'react';

interface LinearProgressProps extends ComponentProps<'div'> {
  value: number; // 0–100
  height?: number; // высота полосы (px), по умолчанию 60
  textClassName?: string; // доп. классы для текста
}

export default function LinearProgress({
  value,
  height = 20,
  className = '',
  textClassName = '',
  ...props
}: LinearProgressProps) {
  const normalized = Math.max(0, Math.min(100, value));

  return (
    <div
      className={`relative w-full bg-scheduled rounded-full overflow-hidden ${className}`}
      style={{ height }}
      {...props}
    >
      <div
        className='h-full bg-primary  transition-all duration-1000 ease-out'
        style={{ width: `${normalized}%` }}
      />

      <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
        <span
          className={`font-bold text-primary select-none ${textClassName}`}
          style={{ fontSize: height * 0.55 }}
        >
          {Math.round(normalized)}
        </span>
      </div>
    </div>
  );
}
