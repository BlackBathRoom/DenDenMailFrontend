import type { GetFoldersQueryParams } from '@/api/routers/messages/folders/type';
import { messagesKeys } from '@/api/routers/messages/key';

export const foldersKeys = {
  all: [...messagesKeys.all, 'folders'] as const,
  list: (queryParams?: GetFoldersQueryParams) =>
    [...foldersKeys.all, 'list', queryParams] as const,
};
