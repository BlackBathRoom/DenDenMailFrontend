import { useRef, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

import type { Message } from '@/types/chat';
import Form from '@/components/ui/Form';
import Loading from '@/components/ui/Loading';

const RouteComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText: string): Promise<void> => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      message: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // ユーザーメッセージ送信後にスクロール
    setTimeout(() => scrollToBottom(), 100);

    try {
      // TODO: バックエンドAPIコールをここに実装
      // 現在は仮の応答をシミュレート
      setTimeout(() => {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          message: 'こんにちは！AIからの応答です。',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
        // AI応答後にもスクロール
        setTimeout(() => scrollToBottom(), 100);
      }, 1500);
    } catch (error) {
      console.error('メッセージ送信エラー:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      handleSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
      {/* ヘッダー */}
      <div className="border-b border-base-300 p-4">
        <h1 className="text-xl font-semibold text-base-content">AIチャット</h1>
      </div>

      {/* メッセージコンテナ */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-base-content/60 text-center">
              メッセージがありません。
              <br />
              AIとの会話を開始してください。
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.isUser
                      ? 'bg-primary text-primary-content'
                      : 'bg-base-200 text-base-content'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-base-200 rounded-lg px-4 py-2">
                  <Loading />
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 入力フォーム */}
      <Form
        onSubmit={handleSubmit}
        className="flex gap-2 p-4 border-t border-base-300"
      >
        <textarea
          value={inputMessage}
          onChange={(e): void => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="AIに質問してください..."
          disabled={isLoading}
          rows={1}
          className="textarea textarea-bordered flex-1 resize-none min-h-[2.5rem] max-h-32"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className="btn btn-primary"
        >
          送信
        </button>
      </Form>
    </div>
  );
};

export const Route = createLazyFileRoute('/chat/')({
  component: RouteComponent,
});
