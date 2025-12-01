import { parse, isBefore } from 'date-fns';

/**
 * Проверяет, прошло ли событие по его дате окончания
 * @param endsAt строка формата "yyyy-MM-dd HH:mm:ss"
 * @returns true если событие уже завершилось
 */
export function isEventPast(endsAt: string): boolean {
  const endDate = parse(endsAt, 'yyyy-MM-dd HH:mm:ss', new Date());
  return isBefore(endDate, new Date());
}
