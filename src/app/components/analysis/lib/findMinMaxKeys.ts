import type {
  AnalysisJSON,
  MetricItem,
} from '@/app/components/analysis/service/analysis.interface';

export function findMinMax(metrics: AnalysisJSON['metrics']) {
  let minItem: MetricItem | null = null;
  let maxItem: MetricItem | null = null;

  for (const group of metrics) {
    for (const item of group.value) {
      const val = Number(item.value);
      if (Number.isNaN(val)) continue;

      if (minItem === null || val < Number(minItem.value)) {
        minItem = item;
      }

      if (maxItem === null || val > Number(maxItem.value)) {
        maxItem = item;
      }
    }
  }

  return {
    minName: minItem?.display_name ?? null,
    minValue: minItem ? Number(minItem.value) : null,
    maxName: maxItem?.display_name ?? null,
    maxValue: maxItem ? Number(maxItem.value) : null,
  };
}
