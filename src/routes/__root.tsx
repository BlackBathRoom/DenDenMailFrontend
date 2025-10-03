import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import Header from '@/components/ui/Header';
import Loading from '@/components/ui/Loading';
import { getVendorsOptions } from '@/api/routers/messages/vendors';

const PendingStartUp = () => {
  return (
    <div className="h-full w-full flex">
      <Loading className="m-auto" variety="bars" size="xl" color="accent" />
    </div>
  );
};

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(getVendorsOptions()),
  pendingComponent: PendingStartUp,
});

function RootComponent() {
  return (
    <div className="flex h-dvh max-h-dvh w-full flex-col gap-5 overflow-y-hidden px-7 py-5">
      <Header />
      <div className="w-full h-full max-h-[calc(100dvh-129.9px)] scrollbar-hidden">
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools position="top" />
      </div>
    </div>
  );
}
