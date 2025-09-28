import type {
  GetMessageBodyResponse,
  GetMessageHeaderResponse,
  GetMessagesHeaderQueryParams,
} from '@/api/routers/messages/type';
import { getRequest } from '@/api/shared';

const getMessagesHeader = async (
  vendor_id: number,
  folder_id: number,
  queryParams?: GetMessagesHeaderQueryParams
): Promise<GetMessageHeaderResponse> =>
  getRequest<GetMessageHeaderResponse>(`messages/${vendor_id}/${folder_id}/`, {
    params: queryParams,
  });

const getMessageBody = async (
  vendor_id: number,
  folder_id: number,
  message_id: number
): Promise<GetMessageBodyResponse> =>
  await getRequest<GetMessageBodyResponse>(
    `messages/${vendor_id}/${folder_id}/${message_id}`
  );

export { getMessageBody, getMessagesHeader };
