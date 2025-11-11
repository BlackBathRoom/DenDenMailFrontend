import Panel from '@/components/ui/Panel';

type Props = {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchPanel: React.FC<Props> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="w-80 flex-shrink-0">
      <Panel className="h-full p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">検索</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="search-input" className="text-sm font-medium">
              キーワード
            </label>
            <input
              id="search-input"
              type="text"
              placeholder="件名または送信者で検索..."
              value={searchQuery}
              onChange={onSearchChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              autoComplete="off"
              autoFocus
            />
          </div>

          <div className="pt-4 border-t border-neutral-200">
            <div className="text-sm text-neutral-600">
              <p className="mb-2">検索対象:</p>
              <ul className="space-y-1 text-xs">
                <li>• 件名</li>
                <li>• 送信者アドレス</li>
              </ul>
            </div>
          </div>

          {searchQuery.trim() && (
            <div className="pt-4 border-t border-neutral-200">
              <div className="text-sm text-neutral-600">
                <p className="mb-1">検索キーワード:</p>
                <p className="font-medium text-neutral-800">{searchQuery}</p>
              </div>
            </div>
          )}
        </div>
      </Panel>
    </div>
  );
};

export default SearchPanel;
