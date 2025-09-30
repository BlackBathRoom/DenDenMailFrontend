import type { BaseDTO } from '@/api/shared';

// dto
interface FolderDTO extends BaseDTO {
  name: string;
  message_count: number;
}

// query params
interface GetFoldersQueryParams {
  vendor_id?: number;
}

// response
type GetFoldersResponse = FolderDTO[];

export type { GetFoldersQueryParams, GetFoldersResponse };
