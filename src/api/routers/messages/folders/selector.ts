import type { GetFoldersResponse } from '@/api/routers/messages/folders/type';
import type { FolderInfo } from '@/types';

const getFoldersSelector = (data: GetFoldersResponse): FolderInfo[] =>
  data.map((item) => ({
    id: item.id,
    name: item.name,
    messageCount: item.message_count,
  }));

export { getFoldersSelector };
