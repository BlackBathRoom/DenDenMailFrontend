import type { SummaryResponse } from '@/api/summary/type';
import type { Summary } from '@/types';

const getSummarySelector = (data: SummaryResponse): Summary => data;

export { getSummarySelector };
