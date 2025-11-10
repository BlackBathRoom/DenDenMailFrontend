import { useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';

import MessageOverview from '@/components/feature/home/MessageOverview';
import Panel from '@/components/ui/Panel';
import { getMessagesInfoOptions } from '@/api/routers/messages';

export const Route = createLazyFileRoute('/search/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: messages } = useSuspenseQuery(getMessagesInfoOptions(1, 1, {}));

  const filteredMessages = useMemo(() => {
    if (!messages || !searchQuery.trim()) {
      return messages || [];
    }

    const query = searchQuery.toLowerCase();
    return messages.filter(
      (message) =>
        message.subject.toLowerCase().includes(query) ||
        message.senderAddress.toLowerCase().includes(query)
    );
  }, [messages, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      {/* 検索フォーム */}
      <Panel className="w-full flex-shrink-0 p-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="search-input" className="text-lg font-semibold">
            メッセージ検索
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="件名または送信者で検索..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
            autoFocus
          />
        </div>
      </Panel>

      {/* 検索結果 */}
      <Panel className="flex-1 w-full min-h-0 p-4">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-center justify-between flex-shrink-0">
            <h2 className="text-xl font-semibold">検索結果</h2>
            <span className="text-sm text-gray-500">
              {`${filteredMessages.length}件`}
            </span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto">
            {filteredMessages.length > 0 ? (
              <div className="flex flex-col gap-2">
                {filteredMessages.map((message) => (
                  <MessageOverview
                    key={message.id}
                    receivedAt={message.receivedAt}
                    subject={message.subject}
                    senderAddress={message.senderAddress}
                    isUnread={!message.isRead}
                    routerInfo={{
                      vendorId: 1,
                      folderId: 1,
                      messageId: message.id,
                    }}
                  />
                ))}
              </div>
            ) : searchQuery.trim() ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">
                  「{searchQuery}」に一致するメッセージが見つかりませんでした
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">
                  検索キーワードを入力してください
                </div>
              </div>
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
}
