import MessageOverview from '@/components/feature/home/MessageOverview';
import Panel from '@/components/ui/Panel';
import type { MessageInfo } from '@/types';

type Props = {
  messages: MessageInfo[];
  selectedMessageId: number | null;
  searchQuery: string;
  onMessageSelect: (messageId: number) => void;
};

const SearchResults: React.FC<Props> = ({
  messages,
  selectedMessageId,
  searchQuery,
  onMessageSelect,
}) => {
  return (
    <div className="flex-1 min-w-0">
      <Panel className="h-full p-4">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-center justify-between flex-shrink-0">
            <h2 className="text-xl font-semibold">検索結果</h2>
            <span className="text-sm text-neutral-500">
              {`${messages.length}件`}
            </span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto">
            {messages.length > 0 ? (
              <div className="flex flex-col gap-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`cursor-pointer rounded-lg transition-colors ${
                      selectedMessageId === message.id
                        ? 'bg-primary/10 ring-2 ring-primary'
                        : 'hover:bg-primary/20'
                    }`}
                    onClick={() => onMessageSelect(message.id)}
                  >
                    <MessageOverview
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
                  </div>
                ))}
              </div>
            ) : searchQuery.trim() ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-neutral-500">
                  <p className="mb-2">
                    「{searchQuery}」に一致するメッセージが見つかりませんでした
                  </p>
                  <p className="text-sm">別のキーワードで検索してください</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-neutral-500">
                  <p className="mb-2">検索キーワードを入力してください</p>
                  <p className="text-sm">
                    件名または送信者アドレスで検索できます
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default SearchResults;
