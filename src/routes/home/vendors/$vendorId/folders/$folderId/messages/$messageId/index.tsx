import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import Panel from '@/components/ui/Panel';
import { getMessageDetailOptions } from '@/api/routers/messages';
import { paramsSchema as parentParamSchema } from '@/routes/home/vendors/$vendorId/folders/$folderId/messages/_helper';

export const Route = createFileRoute(
  '/home/vendors/$vendorId/folders/$folderId/messages/$messageId/'
)({
  validateSearch: parentParamSchema,
  loader: async ({
    params: { vendorId, folderId, messageId },
    context: { queryClient },
  }) =>
    queryClient.ensureQueryData(
      getMessageDetailOptions(
        parseInt(vendorId),
        parseInt(folderId),
        parseInt(messageId)
      )
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();
  console.log('search in message detail:', search);

  const vendorId = parseInt(params.vendorId);
  const folderId = parseInt(params.folderId);
  const messageId = parseInt(params.messageId);

  const { data: message } = useSuspenseQuery(
    getMessageDetailOptions(vendorId, folderId, messageId)
  );

  return (
    <Panel className="flex h-full flex-col overflow-hidden">
      <div className="flex shrink-0 flex-col items-start gap-3 px-10 py-4">
        <h2 className="text-xl font-bold whitespace-break-spaces">
          {message.messageInfo.subject}
        </h2>
        <p className="text-lg">From: {message.messageInfo.senderAddress}</p>
        <p className="text-lg flex gap-2">
          <span>Received at:</span>
          <span className="flex gap-1">
            <span className="flex gap-[0.15rem]">
              <span>{message.messageInfo.receivedAt.year}</span>
              <span>-</span>
              <span>{message.messageInfo.receivedAt.month}</span>
              <span>-</span>
              <span>{message.messageInfo.receivedAt.day}</span>
            </span>
            <span className="flex gap-[0.15rem]">
              <span>{message.messageInfo.receivedAt.hour}</span>
              <span>:</span>
              <span>{message.messageInfo.receivedAt.minute}</span>
            </span>
          </span>
        </p>
      </div>
      <div className="flex-1 overflow-y-auto rounded-b-md bg-base-100 px-16 py-10">
        <p className="text-lg whitespace-pre-wrap break-words">
          {message.textBody}
        </p>
      </div>
    </Panel>
  );
}
