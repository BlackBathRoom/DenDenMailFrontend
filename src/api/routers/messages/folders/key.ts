import { messagesKeys } from '@/api/routers/messages/key';

export const foldersKeys = {
  all: [...messagesKeys.all, 'folders'] as const,
  list: () => [...foldersKeys.all, 'list'] as const,
};
