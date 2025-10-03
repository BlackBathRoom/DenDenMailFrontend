import type { GetPriorityAddressesResponse } from '@/api/routers/rules/addresses/type';
import type { PriorityAddress } from '@/types';

const getPriorityAddressesSelector = (
  data: GetPriorityAddressesResponse
): PriorityAddress[] =>
  data.map((item) => ({
    id: item.id,
    address: item.address,
    level: item.priority,
    displayName: item.name,
  }));

export { getPriorityAddressesSelector };
