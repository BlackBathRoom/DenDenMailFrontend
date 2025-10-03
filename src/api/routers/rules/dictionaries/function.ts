import type {
  GetPriorityDictionariesResponse,
  RegisterPriorityDictionaryBody,
  UpdatePriorityDictionaryBody,
} from '@/api/routers/rules/dictionaries/type';
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '@/api/shared';

const getPriorityDictionaries =
  async (): Promise<GetPriorityDictionariesResponse> =>
    await getRequest<GetPriorityDictionariesResponse>(`rules/dictionaries`);

const registerPriorityDictionary = async ({
  word,
  priority,
}: RegisterPriorityDictionaryBody) =>
  postRequest<RegisterPriorityDictionaryBody>('rules/dictionaries', {
    word,
    priority,
  });

type UpdatePriorityDictionary = {
  id: number;
} & UpdatePriorityDictionaryBody;

const updatePriorityDictionary = async ({
  id,
  priority,
}: UpdatePriorityDictionary) =>
  patchRequest<UpdatePriorityDictionaryBody>(`rules/dictionaries/${id}`, {
    priority,
  });

const deletePriorityDictionary = async (id: number) =>
  await deleteRequest(`rules/dictionaries/${id}`);

export {
  deletePriorityDictionary,
  getPriorityDictionaries,
  registerPriorityDictionary,
  updatePriorityDictionary,
};
