import type { GetPriorityDictionariesResponse } from '@/api/routers/rules/dictionaries/type';
import type { PriorityDictionary } from '@/types';

const getPriorityDictionarySelector = (
  data: GetPriorityDictionariesResponse
): PriorityDictionary[] =>
  data.map((item) => ({
    id: item.id,
    word: item.word,
    level: item.priority,
  }));

export { getPriorityDictionarySelector };
