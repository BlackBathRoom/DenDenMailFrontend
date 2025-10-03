export const summaryKeys = {
  all: ['summary'] as const,
  details: () => [...summaryKeys.all, 'details'] as const,
  detail: (id: number) => [...summaryKeys.details(), id] as const,
};
