import type { DateTime } from '@/types';

export const parseDateTime = (dateTimeString: string): DateTime => {
  const date = new Date(dateTimeString);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
};
