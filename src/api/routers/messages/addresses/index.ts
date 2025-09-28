import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getAddresses,
  updateDisplayName,
} from '@/api/routers/messages/addresses/function';
import { addressesKeys } from '@/api/routers/messages/addresses/key';
import { getAddressesSelector } from '@/api/routers/messages/addresses/selector';

const getAddressesOptions = () =>
  queryOptions({
    queryKey: addressesKeys.list(),
    queryFn: getAddresses,
    select: getAddressesSelector,
  });

const useUpdateDisplayName = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateDisplayName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressesKeys.list() });
    },
  });
  return { updateDisplayName: mutate };
};

export { getAddressesOptions, useUpdateDisplayName };
