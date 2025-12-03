import { format, parse } from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export function getWeekdayAndDay(dateString: string) {
  const date = parse(dateString, DATE_FORMAT, new Date());
  return {
    weekday: format(date, 'eee'),
    day: format(date, 'd'),
  };
}
