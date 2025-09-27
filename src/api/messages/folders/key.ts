import { messagesKeys } from '@/api/messages/key';

export const foldersKeys = {
  all: [...messagesKeys.all, 'folders'] as const,
  list: () => [...foldersKeys.all, 'list'] as const,
};
