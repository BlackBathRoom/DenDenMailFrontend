type DateTime = {
  /** 年 (ゼロパディング4桁) */
  year: string;
  /** 月 (ゼロパディング2桁) */
  month: string;
  /** 日 (ゼロパディング2桁) */
  day: string;
  /** 時 (24時間制, ゼロパディング2桁) */
  hour: string;
  /** 分 (ゼロパディング2桁) */
  minute: string;
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

type BasePriority = {
  id: number;
  level: number;
};

type PriorityDictionary = BasePriority & {
  word: string;
};

type PriorityAddress = BasePriority & AddressInfo;

export type {
  AddressInfo,
  Attachment,
  DateTime,
  FolderInfo,
  MessageDetail,
  MessageInfo,
  PriorityAddress,
  PriorityDictionary,
  Summary,
  VendorInfo,
};
