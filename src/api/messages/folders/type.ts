import type { BaseDTO } from '@/api/shared';

// dto
interface FolderDTO extends BaseDTO {
  name: string;
  message_count: number;
}

// response
type GetFoldersResponse = FolderDTO[];

export type { GetFoldersResponse };
