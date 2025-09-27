import type { GetFoldersResponse } from '@/api/messages/folders/type';
import { getRequest } from '@/api/shared';

const getFolders = async (): Promise<GetFoldersResponse> =>
  await getRequest<GetFoldersResponse>('messages/folders/');

export { getFolders };
