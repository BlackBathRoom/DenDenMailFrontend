import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
  '/home/vendors/$vendorId/folders/$folderId/messages/'
)({
  component: () => null,
});

// function RouteComponent() {
//   return <div>Hello "/home/vendors/$vendorId/folders/$folderId/messages/"!</div>
// }
