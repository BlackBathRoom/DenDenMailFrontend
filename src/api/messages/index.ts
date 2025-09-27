import { useQuery } from '@tanstack/react-query';

import { getMessageBody, getMessagesHeader } from '@/api/messages/function';
import { messagesKeys } from '@/api/messages/key';
import {
  getMessageBodySelector,
  getMessagesHeaderSelector,
} from '@/api/messages/selector';
import type { GetMessagesHeaderQueryParams } from '@/api/messages/type';

const useGetMessagesInfo = (
  vendor_id: number,
  folder_id: number,
  queryParams?: GetMessagesHeaderQueryParams
) => {
  const { data, isPending, isError } = useQuery({
    queryKey: messagesKeys.list(vendor_id, folder_id, queryParams),
    queryFn: async ({ queryKey }) => {
      const [, , vid, fid, qp] = queryKey;
      return await getMessagesHeader(vid, fid, qp);
    },
    select: getMessagesHeaderSelector,
  });
  return { data, isPending, isError };
};

const useGetMessageDetail = (
  vendor_id: number,
  folder_id: number,
  message_id: number
) => {
  const { data, isPending, isError } = useQuery({
    queryKey: messagesKeys.detail(vendor_id, folder_id, message_id),
    queryFn: async ({ queryKey }) => {
      const [, , vid, fid, mid] = queryKey;
      return await getMessageBody(vid, fid, mid);
    },
    select: getMessageBodySelector,
  });
  return { data, isPending, isError };
};

export { useGetMessageDetail, useGetMessagesInfo };
