import type { GetMessagesHeaderQueryParams } from '@/api/messages/type';

export const messagesKeys = {
  all: ['messages'] as const,
  lists: () => [...messagesKeys.all, 'list'] as const,
  list: (
    vendor_id: number,
    folder_id: number,
    filters?: GetMessagesHeaderQueryParams
  ) => [...messagesKeys.lists(), vendor_id, folder_id, filters] as const,
  details: (vendor_id: number, folder_id: number) =>
    [...messagesKeys.all, 'detail', vendor_id, folder_id] as const,
  detail: (vendor_id: number, folder_id: number, message_id: number) =>
    [...messagesKeys.details(vendor_id, folder_id), message_id] as const,
};
