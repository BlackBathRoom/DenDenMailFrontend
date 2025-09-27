import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getAddresses,
  updateDisplayName,
} from '@/api/messages/addresses/function';
import { addressesKeys } from '@/api/messages/addresses/key';
import { getAddressesSelector } from '@/api/messages/addresses/selector';

const useGetAddresses = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: addressesKeys.list(),
    queryFn: getAddresses,
    select: getAddressesSelector,
  });
  return { data, isPending, isError };
};

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

export { useGetAddresses, useUpdateDisplayName };
