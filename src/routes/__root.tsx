import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import PageFrame from '@/components/layout/PageFrame';

export const Route = createRootRoute({
  component: () => (
    <PageFrame>
      <Outlet />
      <TanStackRouterDevtools />
    </PageFrame>
  ),
});
