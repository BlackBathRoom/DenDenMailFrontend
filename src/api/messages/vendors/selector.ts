import type { GetVendorsResponse } from '@/api/messages/vendors/type';
import type { VendorInfo } from '@/types';

const getVendorsSelector = (
  data: GetVendorsResponse
): Omit<VendorInfo, 'iconUrl'>[] => data;

export { getVendorsSelector };
