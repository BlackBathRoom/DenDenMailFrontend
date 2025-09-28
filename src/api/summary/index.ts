import { queryOptions, useMutation } from '@tanstack/react-query';

import { createSummaryRequest, getSummary } from '@/api/summary/function';
import { summaryKeys } from '@/api/summary/key';
import { getSummarySelector } from '@/api/summary/selector';

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
  return { createSummary: mutate, isSuccess };
};

export { getSummaryOptions, useCreateSummary };
