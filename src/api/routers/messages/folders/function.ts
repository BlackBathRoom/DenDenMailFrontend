import type {
  GetFoldersQueryParams,
  GetFoldersResponse,
} from '@/api/routers/messages/folders/type';
import { getRequest } from '@/api/shared';

const getFolders = async (
  queryParams: GetFoldersQueryParams = {}
): Promise<GetFoldersResponse> =>
  await getRequest<GetFoldersResponse>('messages/folders/', {
    params: queryParams,
  });

export { getFolders };
