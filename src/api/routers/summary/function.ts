import type {
  CreateSummaryRequestBody,
  SummaryResponse,
} from '@/api/routers/summary/type';
import { getRequest, postRequest } from '@/api/shared';

const getSummary = async (id: number) =>
  await getRequest<SummaryResponse>(`summary/${id}`);

const createSummaryRequest = async (id: number) =>
  await postRequest<CreateSummaryRequestBody>('/summary/', { id });

export { createSummaryRequest, getSummary };
