import { createFileRoute, redirect } from '@tanstack/react-router';

import { getFoldersOptions } from '@/api/routers/messages/folders';
import { getFoldersSelector } from '@/api/routers/messages/folders/selector';

export const Route = createFileRoute('/home/vendors/$vendorId/folders/')({
  beforeLoad: async ({ params: { vendorId }, context: { queryClient } }) => {
    const data = getFoldersSelector(
      await queryClient.ensureQueryData(
        getFoldersOptions({ vendor_id: parseInt(vendorId) })
      )
    );
    console.log(data);

    return redirect({
      to: '/home/vendors/$vendorId/folders/$folderId/messages',
      params: { vendorId, folderId: data[0].id.toString() },
    });
  },
  component: () => null,
});

// function RouteComponent() {
//   return <Outlet />;
// }
