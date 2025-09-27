import type { GetAddressesResponse } from '@/api/messages/addresses/type';
import type { AddressInfo } from '@/types';

const getAddressesSelector = (data: GetAddressesResponse): AddressInfo[] =>
  data.map((item) => ({
    id: item.id,
    address: item.email_address,
    displayName: item.display_name,
  }));

export { getAddressesSelector };
