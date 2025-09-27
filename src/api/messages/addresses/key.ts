import { messagesKeys } from '@/api/messages/key';

export const addressesKeys = {
  all: [...messagesKeys.all, 'addresses'] as const,
  list: () => [...addressesKeys.all, 'list'] as const,
};
