type Metrics = Record<string, any>;

export function findMinMaxKeys(obj: Metrics) {
  const flat: Record<string, number> = {};

  function traverse(o: Metrics, prefix = '') {
    for (const key in o) {
      const value = o[key];
      const path = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'number') {
        flat[path] = value;
      } else if (typeof value === 'object' && value !== null) {
        traverse(value, path);
      }
    }
  }

  traverse(obj);

  const entries = Object.entries(flat);

  let min: [string, number] = entries[0];
  for (const entry of entries) {
    if (entry[1] < min[1]) {
      min = entry;
    }
  }

  let max: [string, number] = entries[0];
  for (const entry of entries) {
    if (entry[1] > max[1]) {
      max = entry;
    }
  }

  return {
    minKey: min[0],
    minValue: min[1],
    maxKey: max[0],
    maxValue: max[1],
  };
}
