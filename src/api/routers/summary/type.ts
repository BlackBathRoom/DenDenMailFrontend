//dto
interface SummaryDTO {
  content: string;
}

// request body
interface CreateSummaryRequestBody {
  id: number;
}

// response
type SummaryResponse = SummaryDTO;

export type { CreateSummaryRequestBody, SummaryResponse };
