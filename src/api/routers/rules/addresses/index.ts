import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getPriorityAddresses,
  registerPriorityAddress,
  updatePriorityAddress,
} from '@/api/routers/rules/addresses/function';
import { addressesKeys } from '@/api/routers/rules/addresses/key';
import { getPriorityAddressesSelector } from '@/api/routers/rules/addresses/selector';

const getPriorityAddressesOptions = () =>
  queryOptions({
    queryKey: addressesKeys.list(),
    queryFn: getPriorityAddresses,
    select: getPriorityAddressesSelector,
  });

const useRegisterPriorityAddress = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: registerPriorityAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressesKeys.list() });
    },
  });
  return mutate;
};

const useUpdatePriorityAddress = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updatePriorityAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressesKeys.list() });
    },
  });
  return mutate;
};

export {
  getPriorityAddressesOptions,
  useRegisterPriorityAddress,
  useUpdatePriorityAddress,
};
