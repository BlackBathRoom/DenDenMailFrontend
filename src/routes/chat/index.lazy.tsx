import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

import type { Message } from '@/types/chat';
import ChatContainer from '@/components/feature/chat/ChatContainer';
import ChatInput from '@/components/feature/chat/ChatInput';

const RouteComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (messageText: string): Promise<void> => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      message: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

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
      }, 1500);
    } catch (error) {
      console.error('メッセージ送信エラー:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
      <div className="border-b border-base-300 p-4">
        <h1 className="text-xl font-semibold text-base-content">AIチャット</h1>
      </div>
      <ChatContainer messages={messages} isLoading={isLoading} />
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        placeholder="AIに質問してください..."
      />
    </div>
  );
};

export const Route = createLazyFileRoute('/chat/')({
  component: RouteComponent,
});
