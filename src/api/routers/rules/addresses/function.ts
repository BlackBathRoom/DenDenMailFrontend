import type {
  GetPriorityAddressesResponse,
  RegisterPriorityAddressBody,
  UpdatePriorityAddressBody,
} from '@/api/routers/rules/addresses/type';
import { getRequest, patchRequest, postRequest } from '@/api/shared';

const getPriorityAddresses = async (): Promise<GetPriorityAddressesResponse> =>
  await getRequest<GetPriorityAddressesResponse>('/rules/addresses');

const registerPriorityAddress = async ({
  address_id,
  priority,
}: RegisterPriorityAddressBody) =>
  postRequest<RegisterPriorityAddressBody>('/rules/addresses', {
    address_id,
    priority,
  });

type UpdatePriorityAddress = {
  id: number;
} & UpdatePriorityAddressBody;

const updatePriorityAddress = async ({ id, priority }: UpdatePriorityAddress) =>
  patchRequest<UpdatePriorityAddressBody>(`/rules/addresses/${id}`, {
    priority,
  });

export { getPriorityAddresses, registerPriorityAddress, updatePriorityAddress };
