export interface AnalysisJSON {
  total: {
    current_value: number;
    max_value: number;
    min_value: number;
    display_name: string;
    frontend_component_type: string;
  };
  conclusion: {
    display_name: string;
    frontend_component_type: string;
    value: ConclusionItemProps[];
  };

  metrics: MetricGroup[];
}

export interface ConclusionItemProps {
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
