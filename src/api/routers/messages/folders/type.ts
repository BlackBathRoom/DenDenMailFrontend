import type { BaseDTO } from '@/api/shared';

// dto
interface FolderDTO extends BaseDTO {
  name: string;
  message_count: number;
}

// query params
interface GetFoldersQueryParams {
  vendor_id?: number;
  is_read?: boolean;
  only_priority_person?: boolean;
}

// response
type GetFoldersResponse = FolderDTO[];

export type { GetFoldersQueryParams, GetFoldersResponse };
