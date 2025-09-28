import type { SummaryResponse } from '@/api/routers/summary/type';
import type { Summary } from '@/types';

const getSummarySelector = (data: SummaryResponse): Summary => data;

export { getSummarySelector };
