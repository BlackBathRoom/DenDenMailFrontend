import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, ListFilter } from 'lucide-react';

import { useModal } from '@/hooks/useModal';
import MessageOverview from '@/components/feature/home/MessageOverview';
import SummaryTooltip from '@/components/feature/home/SummaryTooltip';
import Divider from '@/components/layout/Divider';
import Modal from '@/components/ui/Modal';
import Panel from '@/components/ui/Panel';
import { getMessagesInfoOptions } from '@/api/routers/messages';
import { getFoldersOptions } from '@/api/routers/messages/folders';
import { getFoldersSelector } from '@/api/routers/messages/folders/selector';
import { getVendorsOptions } from '@/api/routers/messages/vendors';
import { PAGE_PER_MESSAGE } from '@/constants';
import {
  clampPage,
  paramsSchema,
  resolveQueryParams,
} from '@/routes/home/vendors/$vendorId/folders/$folderId/messages/_helper';
import { cn } from '@/utils/cn';

export const Route = createFileRoute(
  '/home/vendors/$vendorId/folders/$folderId/messages'
)({
  validateSearch: paramsSchema,
  loaderDeps: ({ search }) => ({
    isRead: search.isRead,
    page: search.page,
  }),
  loader: async ({
    params: { vendorId, folderId },
    context: { queryClient },
    deps: { isRead, page },
  }) => {
    const folders = getFoldersSelector(
      await queryClient.ensureQueryData(
        getFoldersOptions({
          vendor_id: parseInt(vendorId),
          is_read: isRead ?? undefined,
        })
      )
    );
    const messageCount = folders.find(
      (f) => f.id === parseInt(folderId)
    )?.messageCount;

    const queryParams = resolveQueryParams(isRead, page, messageCount);
    return queryClient.ensureQueryData(
      getMessagesInfoOptions(
        parseInt(vendorId),
        parseInt(folderId),
        queryParams
      )
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();

  const modalId = 'filter-modal';
  const { openModal, closeModal } = useModal(modalId);

  const vendorId = parseInt(params.vendorId);
  const folderId = parseInt(params.folderId);

  const { data: vendors } = useSuspenseQuery(getVendorsOptions());
  const { data: folders } = useSuspenseQuery(
    getFoldersOptions({
      vendor_id: vendorId,
      is_read: search.isRead ?? undefined,
    })
  );

  const queryParams = resolveQueryParams(
    search.isRead,
    search.page,
    folders.find((f) => f.id === folderId)?.messageCount
  );
  const { data: messages } = useSuspenseQuery(
    getMessagesInfoOptions(vendorId, folderId, queryParams)
  );

  const safePage = clampPage(
    search.page,
    folders.find((f) => f.id === folderId)?.messageCount,
    PAGE_PER_MESSAGE
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
                    'btn w-full rounded py-3 btn-ghost flex gap-5',
                    folderId === folder.id && 'bg-base-100/40'
                  )}
                >
                  <span className="text-3xl">{folder.name}</span>
                  <span className="text-sm mt-2">({folder.messageCount})</span>
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
          <h3 className="my-3 w-full rounded-lg bg-base-100/70 py-3 text-center text-4xl font-bold">
            {folders.find((f) => f.id === folderId)?.name}
          </h3>
          <div className="w-full flex justify-between px-3 pb-2">
            <div className="flex gap-2 text-lg pt-[0.35rem]">
              <button className="hover:text-primary" onClick={openModal}>
                <ListFilter className="h-5 w-5" />
              </button>
              <p className="flex gap-1">
                <span>
                  {Math.min(
                    (search.page - 1) * PAGE_PER_MESSAGE + 1,
                    folders.find((f) => f.id === folderId)?.messageCount ?? 0
                  )}
                </span>
                <span>-</span>
                <span>
                  {Math.min(
                    search.page * PAGE_PER_MESSAGE,
                    folders.find((f) => f.id === folderId)?.messageCount ?? 0
                  )}
                </span>
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/home/vendors/$vendorId/folders/$folderId/messages"
                params={{
                  vendorId: vendorId.toString(),
                  folderId: folderId.toString(),
                }}
                search={(old) => ({
                  ...old,
                  isRead: search.isRead,
                  page: Math.max(1, search.page - 1),
                })}
                className={cn(
                  'btn btn-ghost',
                  search.page <= 1 && 'btn-disabled'
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/home/vendors/$vendorId/folders/$folderId/messages"
                params={{
                  vendorId: vendorId.toString(),
                  folderId: folderId.toString(),
                }}
                search={(old) => ({
                  ...old,
                  isRead: search.isRead,
                  page: search.page + 1,
                })}
                className={cn(
                  'btn btn-ghost',
                  safePage * PAGE_PER_MESSAGE >=
                    (folders.find((f) => f.id === folderId)?.messageCount ??
                      0) && 'btn-disabled'
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ul className="flex max-h-full max-w-80 flex-col overflow-x-clip overflow-y-auto rounded-sm bg-base-100 mb-2 pb-1">
            {messages.map((message, i) => (
              <li key={message.id}>
                <Link
                  to="/home/vendors/$vendorId/folders/$folderId/messages/$messageId"
                  params={{
                    vendorId: vendorId.toString(),
                    folderId: folderId.toString(),
                    messageId: message.id.toString(),
                  }}
                  search={(old) => old}
                  className="flex w-full cursor-pointer flex-col px-4 py-2"
                >
                  <SummaryTooltip
                    message_id={message.id}
                    isDisplayBottom={i < 5}
                  >
                    <MessageOverview
                      receivedAt={message.receivedAt}
                      subject={message.subject}
                      senderAddress={message.senderAddress}
                      isUnread={!message.isRead}
                      routerInfo={{
                        vendorId,
                        folderId,
                        messageId: message.id,
                      }}
                    />
                  </SummaryTooltip>
                </Link>
                {i !== messages.length - 1 && (
                  <Divider direction="horizontal" color="secondary" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </Panel>
      <Modal
        modalId={modalId}
        className="flex flex-col gap-5 items-start px-5 py-4 "
      >
        <h3 className="text-2xl font-bold mb-3">Filter</h3>
        <div className="w-full px-2 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h4 className="text-lg font-semibold">Read Status</h4>
            <div className="flex gap-0">
              {['All', 'Read', 'UnRead'].map((value) => (
                <Link
                  key={value}
                  to="/home/vendors/$vendorId/folders/$folderId/messages"
                  params={{
                    vendorId: vendorId.toString(),
                    folderId: folderId.toString(),
                  }}
                  search={(old) => ({
                    ...old,
                    isRead: value === 'All' ? undefined : value === 'Read',
                    page: 1,
                  })}
                  className={cn(
                    'btn btn-md btn-outline btn-primary',
                    value === 'All' &&
                      (search.isRead === undefined || search.isRead === null) &&
                      'btn-active',
                    value === 'Read' && search.isRead === true && 'btn-active',
                    value === 'UnRead' &&
                      search.isRead === false &&
                      'btn-active'
                  )}
                  onClick={closeModal}
                >
                  {value}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      <Outlet />
    </>
  );
}
