import { METRIC_MAX_SCORE } from '@/features/analysis/lib/options';

import type { ComponentProps } from 'react';

interface LinearProgressProps extends ComponentProps<'div'> {
  value: number; // 0–4
  height?: number; // высота полосы
}

export default function LinearProgress({
  value,
  height = 10,
  className = '',
  ...props
}: LinearProgressProps) {
  const normalized =
    (Math.max(0, Math.min(METRIC_MAX_SCORE, value)) / METRIC_MAX_SCORE) * 100;

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
    </div>
  );
}
