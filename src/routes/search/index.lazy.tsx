import { createLazyFileRoute } from '@tanstack/react-router';

import { useSearch } from '@/hooks/useSearch';
import MessageContent from '@/components/feature/search/MessageContent';
import SearchPanel from '@/components/feature/search/SearchPanel';
import SearchResults from '@/components/feature/search/SearchResults';

export const Route = createLazyFileRoute('/search/')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    searchQuery,
    selectedMessageId,
    filteredMessages,
    selectedMessage,
    handleSearchChange,
    handleMessageSelect,
  } = useSearch();

  return (
    <div className="flex h-full w-full gap-4 p-4">
      <SearchPanel
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <SearchResults
        messages={filteredMessages}
        selectedMessageId={selectedMessageId}
        searchQuery={searchQuery}
        onMessageSelect={handleMessageSelect}
      />
      <MessageContent selectedMessage={selectedMessage} />
    </div>
  );
}
