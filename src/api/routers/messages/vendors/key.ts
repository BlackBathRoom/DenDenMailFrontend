import { messagesKeys } from '@/api/routers/messages/key';

export const vendorsKeys = {
  all: [...messagesKeys.all, 'vendors'] as const,
  list: () => [...vendorsKeys.all, 'list'] as const,
};
