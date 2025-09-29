import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getPriorityDictionaries,
  registerPriorityDictionary,
  updatePriorityDictionary,
} from '@/api/routers/rules/dictionaries/function';
import { dictionariesKeys } from '@/api/routers/rules/dictionaries/key';
import { getPriorityDictionarySelector } from '@/api/routers/rules/dictionaries/selector';

const getPriorityDictionaryOptions = () =>
  queryOptions({
    queryKey: dictionariesKeys.list(),
    queryFn: getPriorityDictionaries,
    select: getPriorityDictionarySelector,
  });

const useRegisterPriorityDictionary = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: registerPriorityDictionary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dictionariesKeys.list() });
    },
  });
  return mutate;
};

const useUpdatePriorityDictionary = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updatePriorityDictionary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dictionariesKeys.list() });
    },
  });
  return mutate;
};

export {
  getPriorityDictionaryOptions,
  useRegisterPriorityDictionary,
  useUpdatePriorityDictionary,
};
