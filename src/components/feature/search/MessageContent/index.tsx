import Panel from '@/components/ui/Panel';
import type { DateTime } from '@/types';

type Message = {
  id: number;
  subject: string;
  senderAddress: string;
  receivedAt: DateTime;
  isRead: boolean;
};

type Props = {
  selectedMessage: Message | null;
};

const MessageContent: React.FC<Props> = ({ selectedMessage }) => {
  return (
    <div className="flex-1 min-w-0">
      <Panel className="h-full p-4">
        <div className="flex h-full flex-col gap-4">
          <div className="flex items-center justify-between flex-shrink-0">
            <h2 className="text-xl font-semibold">メール内容</h2>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto">
            {selectedMessage ? (
              <div className="flex flex-col gap-4">
                <div className="border-b border-neutral-200 pb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {selectedMessage.subject}
                  </h3>
                  <div className="text-sm text-neutral-600 space-y-1">
                    <p>
                      <span className="font-medium">送信者:</span>{' '}
                      {selectedMessage.senderAddress}
                    </p>
                    <p>
                      <span className="font-medium">受信日時:</span>{' '}
                      {selectedMessage.receivedAt
                        ? selectedMessage.receivedAt.toLocaleString()
                        : '不明'}
                    </p>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none">
                  <p className="text-neutral-600">
                    メール本文はここに表示されます。
                    現在はプレビュー表示のみとなっています。
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-neutral-500">
                  <p className="mb-2">メールを選択してください</p>
                  <p className="text-sm">
                    検索結果からメールをクリックすると内容が表示されます
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

export default MessageContent;
