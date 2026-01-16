/**
 * Проверяет, прошло ли событие по его дате окончания
 * @param endsAtUtc строка формата "yyyy-MM-dd HH:mm:ss"
 * @returns true если событие уже завершилось
 */

export function isEventPast(endsAtUtc: string): boolean {
  const isoString = endsAtUtc.replace(' ', 'T') + 'Z';

  const endDateUtc = new Date(isoString);

  return endDateUtc.getTime() < Date.now();
}
