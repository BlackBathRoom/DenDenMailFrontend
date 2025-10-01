import { createFileRoute, Outlet } from '@tanstack/react-router';

import Panel from '@/components/ui/Panel';
import { getPriorityAddressesOptions } from '@/api/routers/rules/addresses';
import { getPriorityDictionaryOptions } from '@/api/routers/rules/dictionaries';

export const Route = createFileRoute('/settings')({
  loader: async ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(getPriorityAddressesOptions());
    queryClient.ensureQueryData(getPriorityDictionaryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Panel className="flex h-full w-full flex-col items-center gap-3 overflow-y-auto p-5">
      <Outlet />
    </Panel>
  );
}
