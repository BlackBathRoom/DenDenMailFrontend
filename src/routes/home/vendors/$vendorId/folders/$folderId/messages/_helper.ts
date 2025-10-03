import { z } from 'zod';

import type { GetMessagesHeaderQueryParams } from '@/api/routers/messages/type';
import { PAGE_PER_MESSAGE } from '@/constants';

const clampPage = (
  page: number,
  totalItems: number | undefined,
  perPage: number
): number => {
  const total = totalItems ?? 0;
  const maxPage = Math.max(1, Math.ceil(total / perPage));
  if (Number.isNaN(page) || page < 1) return 1;
  return Math.min(page, maxPage);
};

const resolveQueryParams = (
  isRead: boolean | null,
  page: number,
  messageCount?: number
): GetMessagesHeaderQueryParams => {
  const safePage = clampPage(page, messageCount, PAGE_PER_MESSAGE);
  const qp = {
    is_read: isRead === null ? undefined : isRead === true,
    limit: PAGE_PER_MESSAGE,
    offset: (safePage - 1) * PAGE_PER_MESSAGE,
  } as const;
  return Object.fromEntries(
    Object.entries(qp).filter(([, v]) => v !== undefined)
  );
};

const paramsSchema = z.object({
  isRead: z.boolean().nullable().default(null),
  page: z.number().min(1).default(1),
  priorityPerson: z.boolean().default(false),
  orderBy: z.enum(['dateReceived', 'priorityPerson']).default('dateReceived'),
});

export { clampPage, paramsSchema, resolveQueryParams };
