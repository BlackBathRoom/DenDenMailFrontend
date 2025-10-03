import { queryOptions, useMutation } from '@tanstack/react-query';

import {
  createSummaryRequest,
  getSummary,
} from '@/api/routers/summary/function';
import { summaryKeys } from '@/api/routers/summary/key';
import { getSummarySelector } from '@/api/routers/summary/selector';

const getSummaryOptions = (message_id: number) =>
  queryOptions({
    queryKey: summaryKeys.detail(message_id),
    queryFn: async ({ queryKey }) => {
      const [, , id] = queryKey;
      return await getSummary(id);
    },
    select: getSummarySelector,
  });

const useCreateSummary = () => {
  const { mutate, isSuccess } = useMutation({
    mutationFn: createSummaryRequest,
  });
  return { mutate, isSuccess };
};

export { getSummaryOptions, useCreateSummary };
