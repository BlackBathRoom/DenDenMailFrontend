import { queryOptions } from '@tanstack/react-query';

import { getFolders } from '@/api/routers/messages/folders/function';
import { foldersKeys } from '@/api/routers/messages/folders/key';
import { getFoldersSelector } from '@/api/routers/messages/folders/selector';

const getFoldersOptions = () =>
  queryOptions({
    queryKey: foldersKeys.list(),
    queryFn: getFolders,
    select: getFoldersSelector,
  });

export { getFoldersOptions };
