import { queryOptions } from '@tanstack/react-query';

import { getFolders } from '@/api/routers/messages/folders/function';
import { foldersKeys } from '@/api/routers/messages/folders/key';
import { getFoldersSelector } from '@/api/routers/messages/folders/selector';
import type { GetFoldersQueryParams } from '@/api/routers/messages/folders/type';

const getFoldersOptions = (queryParams?: GetFoldersQueryParams) =>
  queryOptions({
    queryKey: foldersKeys.list(queryParams),
    queryFn: async ({ queryKey }) => {
      const [, , , qp] = queryKey;
      return await getFolders(qp);
    },
    select: getFoldersSelector,
  });

export { getFoldersOptions };
