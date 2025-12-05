import { MAX_TOTAL_SCORE } from '@/app/components/analysis/lib/options';

function countScoreHint(percentage: number) {
  if (percentage >= 85) {
    return 'Экспертный уровень исполнения методологии Stayfitt.';
  }
  if (percentage >= 70) {
    return 'Уверенная встреча с заметными точками усиления.';
  }
  if (percentage >= 55) {
    return 'Стабильный результат: важно доработать ключевые блоки.';
  }
  if (percentage >= 40) {
    return 'Требуется адресная работа над структурой и аргументацией.';
  }
  return 'Необходима серьёзная проработка всех этапов разговора.';
}

function clampPercentage(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

export function renderScore(totalScore: number) {
  const cappedScore = Math.min(totalScore, MAX_TOTAL_SCORE);
  const percentage = clampPercentage((cappedScore / MAX_TOTAL_SCORE) * 100);

  return countScoreHint(percentage);
}
