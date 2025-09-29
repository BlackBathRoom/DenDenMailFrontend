import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import Header from '@/components/ui/Header';

const RootComponent = () => {
  return (
    <div className="flex h-dvh max-h-dvh w-full flex-col gap-5 overflow-y-hidden px-7 py-5">
      <Header />
      <div className="w-full flex-1">
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools position="top" />
      </div>
    </div>
  );
};

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});
