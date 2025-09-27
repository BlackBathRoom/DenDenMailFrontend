import type {
  GetAddressesResponse,
  UpdateAddressRequestBody,
} from '@/api/messages/addresses/type';
import { getRequest, patchRequest } from '@/api/shared';

const getAddresses = async (): Promise<GetAddressesResponse> =>
  await getRequest<GetAddressesResponse>('messages/addresses/');

type UpdateDisplayNameTarget = {
  addressId: number;
  displayName: string;
};

const updateDisplayName = async ({
  addressId,
  displayName,
}: UpdateDisplayNameTarget) =>
  await patchRequest<UpdateAddressRequestBody>(
    `messages/addresses/${addressId}/`,
    { display_name: displayName }
  );

export { getAddresses, updateDisplayName };
