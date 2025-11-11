import { useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getMessagesInfoOptions } from '@/api/routers/messages';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );

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

  const selectedMessage = useMemo(() => {
    return (
      filteredMessages.find((message) => message.id === selectedMessageId) ||
      null
    );
  }, [filteredMessages, selectedMessageId]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedMessageId(null);
  };

  const handleMessageSelect = (messageId: number) => {
    setSelectedMessageId(messageId);
  };

  return {
    searchQuery,
    selectedMessageId,
    filteredMessages,
    selectedMessage,
    handleSearchChange,
    handleMessageSelect,
  };
};
