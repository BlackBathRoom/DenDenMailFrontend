type DateTime = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

type MessageInfo = {
  id: number;
  subject: string;
  senderAddress: string;
  isRead: boolean;
  receivedAt: DateTime;
};

type Attachment = {
  id: number;
  filename: string;
  mimeType: string;
  mimeSubtype: string;
  sizeBytes: number;
};

type MessageDetail = {
  messageInfo: MessageInfo;
  textBody: string | null;
  htmlBody: string | null;
  attachments: Attachment[] | null;
};

type AddressInfo = {
  id: number;
  address: string;
  displayName: string | null;
};

type VendorInfo = {
  id: number;
  name: string;
  iconUrl: string;
};

type FolderInfo = {
  id: number;
  name: string;
  messageCount: number;
};

type Summary = {
  content: string;
};

export type {
  AddressInfo,
  Attachment,
  DateTime,
  FolderInfo,
  MessageDetail,
  MessageInfo,
  Summary,
  VendorInfo,
};
