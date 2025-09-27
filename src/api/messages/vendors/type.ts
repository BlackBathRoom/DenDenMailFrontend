import type { BaseDTO } from '@/api/shared';

// dto
interface VendorDTO extends BaseDTO {
  id: number;
  name: string;
}

// request body
interface CreateVendorRequestBody {
  name: string;
}

//response
type GetVendorsResponse = VendorDTO[];

export type { CreateVendorRequestBody, GetVendorsResponse };
