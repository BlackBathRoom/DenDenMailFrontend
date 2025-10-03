import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getMessageBody,
  getMessagesHeader,
  switchReadStatus,
} from '@/api/routers/messages/function';
import { messagesKeys } from '@/api/routers/messages/key';
import {
  getMessageBodySelector,
  getMessagesHeaderSelector,
} from '@/api/routers/messages/selector';
import type { GetMessagesHeaderQueryParams } from '@/api/routers/messages/type';

type Args = {
  vendorId: number;
  folderId: number;
  messageId: number;
  isRead: boolean;
};

const getMessagesInfoOptions = (
  vendor_id: number,
  folder_id: number,
  queryParams?: GetMessagesHeaderQueryParams
) =>
  queryOptions({
    queryKey: messagesKeys.list(vendor_id, folder_id, queryParams),
    queryFn: async ({ queryKey }) => {
      const [, , vid, fid, qp] = queryKey;
      return await getMessagesHeader(vid, fid, qp);
    },
    select: getMessagesHeaderSelector,
  });

const getMessageDetailOptions = (
  vendor_id: number,
  folder_id: number,
  message_id: number
) =>
  queryOptions({
    queryKey: messagesKeys.detail(vendor_id, folder_id, message_id),
    queryFn: async ({ queryKey }) => {
      const [, , vid, fid, mid] = queryKey;
      return await getMessageBody(vid, fid, mid);
    },
    select: getMessageBodySelector,
  });

const useSwitchReadStatus = () => {
  const queryClient = useQueryClient();
  const { mutate, variables } = useMutation({
    mutationFn: async (arg: Args) =>
      await switchReadStatus(
        arg.vendorId,
        arg.folderId,
        arg.messageId,
        arg.isRead
      ),
    onSuccess: (_, arg) => {
      queryClient.invalidateQueries({
        queryKey: messagesKeys.list(arg.vendorId, arg.folderId),
      });
      queryClient.invalidateQueries({
        queryKey: messagesKeys.detail(
          arg.vendorId,
          arg.folderId,
          arg.messageId
        ),
      });
    },
  });
  return { mutate, variables };
};

export { getMessageDetailOptions, getMessagesInfoOptions, useSwitchReadStatus };
