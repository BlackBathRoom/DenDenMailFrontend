import { useMemo, useState } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import {
  getMessageDetailOptions,
  getMessagesInfoOptions,
} from '@/api/routers/messages';

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

  const autoSelectedMessageId = useMemo(() => {
    if (filteredMessages.length === 0) {
      return null;
    }

    if (
      selectedMessageId &&
      filteredMessages.some((msg) => msg.id === selectedMessageId)
    ) {
      return selectedMessageId;
    }

    return filteredMessages[0].id;
  }, [filteredMessages, selectedMessageId]);

  // 条件付きクエリにはuseQueryを使用
  const { data: selectedMessageDetail } = useQuery({
    ...getMessageDetailOptions(1, 1, autoSelectedMessageId || 0),
    enabled: autoSelectedMessageId !== null,
  });

  const selectedMessage = useMemo(() => {
    return autoSelectedMessageId && selectedMessageDetail
      ? selectedMessageDetail
      : null;
  }, [autoSelectedMessageId, selectedMessageDetail]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleMessageSelect = (messageId: number) => {
    setSelectedMessageId(messageId);
  };

  return {
    searchQuery,
    selectedMessageId: autoSelectedMessageId,
    filteredMessages,
    selectedMessage,
    handleSearchChange,
    handleMessageSelect,
  };
};
