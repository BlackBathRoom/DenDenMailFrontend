import type { BaseDTO } from '@/api/shared';

// dto
interface AttachmentDTO extends BaseDTO {
  filename: string;
  mime_type: string;
  mime_subtype: string;
  size_bytes: number;
  content_id: string | null;
  is_inline: boolean;
  content_url: string;
}

interface MessageHeaderDTO extends BaseDTO {
  subject: string;
  date_received: string; // ISO 8601 date string
  is_read: boolean;
  sender_address: string;
}

interface MessageBodyDTO extends BaseDTO {
  header: MessageHeaderDTO;
  text: string | null;
  html: string | null;
  encoding: string;
  attachments: AttachmentDTO[];
}

// query params
interface GetMessagesHeaderQueryParams {
  is_read?: boolean;
  offset?: number;
  limit?: number;
}

// request body
interface SwitchReadStatusBody {
  is_read: boolean;
}

// response
type GetMessageHeaderResponse = MessageHeaderDTO[];
type GetMessageBodyResponse = MessageBodyDTO;

export type {
  GetMessageBodyResponse,
  GetMessageHeaderResponse,
  GetMessagesHeaderQueryParams,
  SwitchReadStatusBody,
};
