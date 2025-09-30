import { useSuspenseQuery } from '@tanstack/react-query';
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from '@tanstack/react-router';

import Panel from '@/components/ui/Panel';
import { getVendorsOptions } from '@/api/routers/messages/vendors';
import { getVendorsSelector } from '@/api/routers/messages/vendors/selector';

export const Route = createFileRoute('/home/vendors')({
  beforeLoad: async ({ context: { queryClient } }) => {
    const data = getVendorsSelector(
      await queryClient.ensureQueryData(getVendorsOptions())
    );
    redirect({
      to: '/home/vendors/$vendorId/folders',
      params: { vendorId: data[0].id.toString() },
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: vendors } = useSuspenseQuery(getVendorsOptions());

  return (
    <>
      <Panel className="flex h-full w-fit flex-col gap-5 px-3 py-5">
        {vendors.map((vendor) => (
          <Link
            to="/home/vendors/$vendorId/folders"
            params={{ vendorId: vendor.id.toString() }}
            key={vendor.id}
            className="flex h-16 w-16 items-center justify-center rounded-lg bg-base-100"
          >
            <span className="text-3xl">
              {vendor.name.charAt(0).toUpperCase()}
            </span>
          </Link>
        ))}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-base-100">
          <span className="pb-3 text-5xl">+</span>
        </div>
      </Panel>
      <Outlet />
    </>
  );
}
