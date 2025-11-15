import { createFileRoute, Outlet } from '@tanstack/react-router';

import Panel from '@/components/ui/Panel';

export const Route = createFileRoute('/search')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Panel className="flex h-full w-full flex-col items-center gap-3">
      <Outlet />
    </Panel>
  );
}
