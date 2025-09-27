import type {
  CreateVendorRequestBody,
  GetVendorsResponse,
} from '@/api/messages/vendors/type';
import { getRequest, postRequest } from '@/api/shared';

const getVendors = async (): Promise<GetVendorsResponse> =>
  await getRequest<GetVendorsResponse>('messages/vendors/');

const registerVendor = async (vendorName: string) =>
  await postRequest<CreateVendorRequestBody>('messages/vendors/', {
    name: vendorName,
  });

export { getVendors, registerVendor };
