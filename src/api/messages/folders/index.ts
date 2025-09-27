import { useQuery } from '@tanstack/react-query';

import { getFolders } from '@/api/messages/folders/function';
import { foldersKeys } from '@/api/messages/folders/key';
import { getFoldersSelector } from '@/api/messages/folders/selector';

const useGetFolders = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: foldersKeys.list(),
    queryFn: getFolders,
    select: getFoldersSelector,
  });
  return { data, isPending, isError };
};

export { useGetFolders };
