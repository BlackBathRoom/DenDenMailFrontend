import type {
  GetMessageBodyResponse,
  GetMessageHeaderResponse,
} from '@/api/messages/type';
import type { MessageDetail, MessageInfo } from '@/types';
import { parseDateTime } from '@/utils/date';

const getMessagesHeaderSelector = (
  data: GetMessageHeaderResponse
): MessageInfo[] =>
  data.map((item) => ({
    id: item.id,
    subject: item.subject,
    receivedAt: parseDateTime(item.date_received),
    isRead: item.is_read,
    senderAddress: item.sender_address,
  }));

const getMessageBodySelector = (
  data: GetMessageBodyResponse
): Omit<MessageDetail, 'messageInfo'> => ({
  textBody: data.text,
  htmlBody: data.html,
  attachments: data.attachments.length
    ? data.attachments
        .filter((attachment) => !attachment.is_inline)
        .map((attachment) => ({
          id: attachment.id,
          filename: attachment.filename,
          mimeType: attachment.mime_type,
          mimeSubtype: attachment.mime_subtype,
          sizeBytes: attachment.size_bytes,
        }))
    : null,
});

export { getMessageBodySelector, getMessagesHeaderSelector };
