import { rulesKeys } from '@/api/routers/rules/key';

export const addressesKeys = {
  all: rulesKeys.all,
  list: () => [...addressesKeys.all, 'addresses'] as const,
};
