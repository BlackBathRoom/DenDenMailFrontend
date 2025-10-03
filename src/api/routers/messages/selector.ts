import type {
  GetMessageBodyResponse,
  GetMessageHeaderResponse,
} from '@/api/routers/messages/type';
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
): MessageDetail => ({
  messageInfo: {
    id: data.id,
    subject: data.header.subject,
    receivedAt: parseDateTime(data.header.date_received),
    isRead: data.header.is_read,
    senderAddress: data.header.sender_address,
  },
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
