import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/home')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full w-full items-start gap-3">
      <Outlet />
    </div>
  );
}
