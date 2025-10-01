import type {
  GetPriorityDictionariesResponse,
  RegisterPriorityDictionaryBody,
  UpdatePriorityDictionaryBody,
} from '@/api/routers/rules/dictionaries/type';
import { getRequest, patchRequest, postRequest } from '@/api/shared';

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

export {
  getPriorityDictionaries,
  registerPriorityDictionary,
  updatePriorityDictionary,
};
