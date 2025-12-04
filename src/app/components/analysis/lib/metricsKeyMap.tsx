const metricsDictionary: Record<string, string> = {
  client_research_and_goal_setting: 'Исследование клиента и постановка целей',
  small_talk: 'Small Talk',
  agenda_setting: 'Регламент встречи',
  loyalty_building: 'Формирование доверия',
  'spin_questions.situational': 'SPIN: Situational',
  'spin_questions.problem': 'SPIN: Problem',
  ' spin_questions.implication': 'SPIN: Implication',
  'spin_questions.need_payoff': 'SPIN: Need-payoff',
  product_presentation_alignment: 'Презентация продукта',
  proposal_discussion: 'Обсуждение предложения',
  commitment_to_next_steps: 'Фиксация следующих шагов',
  'objection_handling.algorithm_adherence': 'Алгоритм работы с возражениями',
  'objection_handling.response_effectiveness': 'Эффективность ответа',
  'objection_handling.proactive_prevention': 'Проактивная профилактика',
  'language_and_communication.clarity': 'Ясность коммуникации',
  'language_and_communication.empathy': 'Эмпатия и активное слушание',
};

export function getMetricLabel(key: string): string {
  return metricsDictionary[key] ?? key;
}
