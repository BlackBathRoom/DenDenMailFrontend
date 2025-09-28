import type { BaseDTO } from '@/api/shared';

// dto
interface AddressDTO extends BaseDTO {
  email_address: string;
  display_name: string | null;
}

// request body
interface UpdateAddressRequestBody {
  display_name: string;
}

// response
type GetAddressesResponse = AddressDTO[];

export type { GetAddressesResponse, UpdateAddressRequestBody };
