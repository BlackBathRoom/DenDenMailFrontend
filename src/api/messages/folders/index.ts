import { queryOptions } from '@tanstack/react-query';

import { getFolders } from '@/api/messages/folders/function';
import { foldersKeys } from '@/api/messages/folders/key';
import { getFoldersSelector } from '@/api/messages/folders/selector';

const getFoldersOptions = () =>
  queryOptions({
    queryKey: foldersKeys.list(),
    queryFn: getFolders,
    select: getFoldersSelector,
  });

export { getFoldersOptions };
