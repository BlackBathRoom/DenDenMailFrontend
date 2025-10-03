import type { BasePriority } from '@/api/shared';

// dto
interface PriorityAddressDTO extends BasePriority {
  address: string;
  name: string | null;
}

// request body
interface RegisterPriorityAddressBody {
  address_id: number;
  priority: number;
}

interface UpdatePriorityAddressBody {
  priority: number;
}

// response
type GetPriorityAddressesResponse = PriorityAddressDTO[];

export type {
  GetPriorityAddressesResponse,
  RegisterPriorityAddressBody,
  UpdatePriorityAddressBody,
};
