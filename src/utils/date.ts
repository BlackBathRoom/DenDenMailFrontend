import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import type { DateTime } from '@/types';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 与えられた日時文字列を Asia/Seoul タイムゾーンとして解釈し、
 * 表示用にゼロパディングされた各要素 (YYYY, MM, DD, HH, mm) を文字列で返します。
 * @param dateTimeString ISO8601 等 dayjs が解釈可能な日時文字列
 * @returns DateTime 各フィールドはゼロパディング済み文字列
 */
export const parseDateTime = (dateTimeString: string): DateTime => {
  const d = dayjs(dateTimeString).tz('Asia/Seoul');
  return {
    year: d.format('YYYY'),
    month: d.format('MM'),
    day: d.format('DD'),
    hour: d.format('HH'),
    minute: d.format('mm'),
    deserialize: () => dateTimeString,
  };
};
