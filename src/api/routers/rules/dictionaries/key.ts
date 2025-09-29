import { rulesKeys } from '@/api/routers/rules/key';

export const dictionariesKeys = {
  all: [...rulesKeys.all, 'dictionaries'] as const,
  list: () => [...dictionariesKeys.all, 'list'] as const,
};
