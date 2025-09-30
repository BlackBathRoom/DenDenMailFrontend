import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

import Divider from '@/components/layout/Divider';
import Panel from '@/components/ui/Panel';
import { getMessagesInfoOptions } from '@/api/routers/messages';
import { getFoldersOptions } from '@/api/routers/messages/folders';
import { getVendorsOptions } from '@/api/routers/messages/vendors';
import { cn } from '@/utils/cn';

export const Route = createFileRoute(
  '/home/vendors/$vendorId/folders/$folderId/messages'
)({
  loader: async ({
    params: { vendorId, folderId },
    context: { queryClient },
  }) =>
    queryClient.ensureQueryData(
      getMessagesInfoOptions(parseInt(vendorId), parseInt(folderId))
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const vendorId = parseInt(params.vendorId);
  const folderId = parseInt(params.folderId);

  const { data: vendors } = useSuspenseQuery(getVendorsOptions());
  const { data: folders } = useSuspenseQuery(
    getFoldersOptions({ vendor_id: vendorId })
  );
  const { data: messages } = useSuspenseQuery(
    getMessagesInfoOptions(vendorId, folderId)
  );

  return (
    <>
      <Panel className="flex h-full w-fit gap-3 px-5">
        <div className="flex min-w-60 flex-col items-center">
          <h3 className="my-5 w-full rounded-lg bg-base-100/70 py-3 text-center text-4xl font-bold">
            {vendors.find((v) => v.id === vendorId)?.name}
          </h3>
          <ul className="flex w-full flex-col">
            {folders.map((folder, i) => (
              <li className="w-full" key={folder.id}>
                <Link
                  to="/home/vendors/$vendorId/folders/$folderId/messages"
                  params={{
                    vendorId: vendorId.toString(),
                    folderId: folder.id.toString(),
                  }}
                  className={cn(
                    'btn w-full rounded py-3 text-3xl btn-ghost',
                    folderId === folder.id && 'bg-base-100/40'
                  )}
                >
                  {folder.name}
                </Link>
                {i !== folders.length - 1 && (
                  <Divider direction="horizontal" color="secondary" />
                )}
              </li>
            ))}
          </ul>
        </div>
        <Divider direction="vertical" color="primary" />
        <div className="flex min-w-80 flex-col">
          <h3 className="my-5 w-full rounded-lg bg-base-100/70 py-3 text-center text-4xl font-bold">
            {folders.find((f) => f.id === folderId)?.name}
          </h3>
          <ul className="flex max-h-full max-w-80 flex-col overflow-y-auto rounded-sm bg-base-100 mb-2 pb-1">
            {messages.map((message, i) => (
              <li key={message.id}>
                <Link
                  to="/home/vendors/$vendorId/folders/$folderId/messages/$messageId"
                  params={{
                    vendorId: vendorId.toString(),
                    folderId: folderId.toString(),
                    messageId: message.id.toString(),
                  }}
                  className="flex w-full cursor-pointer flex-col px-4 py-2"
                >
                  <p className="text-end text-sm text-primary flex gap-1 justify-end">
                    <span className="flex gap-[0.15rem]">
                      <span>{message.receivedAt.year}</span>
                      <span>-</span>
                      <span>{message.receivedAt.month}</span>
                      <span>-</span>
                      <span>{message.receivedAt.day}</span>
                    </span>
                    <span className="flex gap-[0.15rem]">
                      <span>{message.receivedAt.hour}</span>
                      <span>:</span>
                      <span>{message.receivedAt.minute}</span>
                    </span>
                  </p>
                  <h4 className="text-start text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                    {message.subject}
                  </h4>
                  <p className="text-start text-sm text-primary">
                    {message.senderAddress}
                  </p>
                </Link>
                {i !== messages.length - 1 && (
                  <Divider direction="horizontal" color="secondary" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </Panel>
      <Outlet />
    </>
  );
}
