export interface AnalysisJSON {
  total: {
    display_name: string;
    value: number;
    maxValue: number;
  };

  conclusion: {
    display_name: string;
    frontend_component_type: 'conclusion';
    value: ConclusionBlock[];
  };

  metrics: MetricGroup[];
}

export interface ConclusionBlock {
  display_name: string;
  value: string[];
}

export interface MetricGroup {
  display_name: string;
  frontend_component_type: 'list-horizontal';
  value: MetricItem[];
}

export interface MetricItem {
  display_name: string;
  frontend_component_type: 'linear-progress';
  value: string;
}
