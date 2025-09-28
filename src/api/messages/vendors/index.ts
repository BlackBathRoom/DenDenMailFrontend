import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { getVendors, registerVendor } from '@/api/messages/vendors/function';
import { vendorsKeys } from '@/api/messages/vendors/key';
import { getVendorsSelector } from '@/api/messages/vendors/selector';

const getVendorsOptions = () =>
  queryOptions({
    queryKey: vendorsKeys.list(),
    queryFn: getVendors,
    select: getVendorsSelector,
  });

const useRegisterVendor = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: registerVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vendorsKeys.list() });
    },
  });
  return { registerVendor: mutate };
};

export { getVendorsOptions, useRegisterVendor };
