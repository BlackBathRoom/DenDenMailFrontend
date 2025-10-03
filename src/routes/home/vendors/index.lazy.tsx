import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/home/vendors/')({
  component: () => null,
});

// function RouteComponent() {
//   return <div>Hello "/home/vendors/"!</div>
// }
