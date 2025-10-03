import type { BasePriority } from '@/api/shared';

// dto
interface PriorityDictionaryDTO extends BasePriority {
  word: string;
}

// request body
interface RegisterPriorityDictionaryBody {
  word: string;
  priority: number;
}

interface UpdatePriorityDictionaryBody {
  priority: number;
}

// response
type GetPriorityDictionariesResponse = PriorityDictionaryDTO[];

export type {
  GetPriorityDictionariesResponse,
  RegisterPriorityDictionaryBody,
  UpdatePriorityDictionaryBody,
};
