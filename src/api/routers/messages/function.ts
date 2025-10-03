import type {
  GetMessageBodyResponse,
  GetMessageHeaderResponse,
  GetMessagesHeaderQueryParams,
  SwitchReadStatusBody,
} from '@/api/routers/messages/type';
import { getRequest, patchRequest } from '@/api/shared';

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

const switchReadStatus = async (
  vendor_id: number,
  folder_id: number,
  message_id: number,
  is_read: boolean
) =>
  await patchRequest<SwitchReadStatusBody>(
    `messages/${vendor_id}/${folder_id}/${message_id}/read`,
    { is_read }
  );

export { getMessageBody, getMessagesHeader, switchReadStatus };
