import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import DragAndDrop from './index';

const meta: Meta<typeof DragAndDrop> = {
  title: 'Components/ui/DragAndDrop',
  component: DragAndDrop,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// 基本的なテスト用コンポーネント
const BasicDragDropTest = () => {
  const [items, setItems] = useState([
    { id: 'item1', content: 'ドラッグ可能なアイテム 1', zone: 'source' },
    { id: 'item2', content: 'ドラッグ可能なアイテム 2', zone: 'source' },
    { id: 'item3', content: 'ドラッグ可能なアイテム 3', zone: 'source' },
  ]);

  const [dropHistory, setDropHistory] = useState<string[]>([]);

  const moveItem = (itemId: string, targetZone: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, zone: targetZone } : item
      )
    );

    const item = items.find((i) => i.id === itemId);
    setDropHistory((prev) => [
      ...prev,
      `${item?.content} を ${targetZone === 'source' ? 'ソース' : 'ターゲット'}エリアに移動`,
    ]);
  };

  const sourceItems = items.filter((item) => item.zone === 'source');
  const targetItems = items.filter((item) => item.zone === 'target');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center">
        ドラッグ&ドロップ テスト
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ソースエリア */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">
            📦 ソースエリア
          </h3>
          <DragAndDrop.DropZone
            onDrop={(itemId) => moveItem(itemId, 'source')}
            className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 min-h-[200px]"
          >
            <div className="space-y-2">
              {sourceItems.map((item) => (
                <DragAndDrop.Item
                  key={item.id}
                  itemId={item.id}
                  className="bg-white p-3 rounded border shadow-sm hover:shadow-md transition-shadow"
                >
                  {item.content}
                </DragAndDrop.Item>
              ))}
              {sourceItems.length === 0 && (
                <div className="text-gray-500 text-center py-8">
                  アイテムをここにドロップ
                </div>
              )}
            </div>
          </DragAndDrop.DropZone>
        </div>

        {/* ターゲットエリア */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">
            🎯 ターゲットエリア
          </h3>
          <DragAndDrop.DropZone
            onDrop={(itemId) => moveItem(itemId, 'target')}
            className="bg-green-50 border-2 border-green-200 rounded-lg p-4 min-h-[200px]"
          >
            <div className="space-y-2">
              {targetItems.map((item) => (
                <DragAndDrop.Item
                  key={item.id}
                  itemId={item.id}
                  className="bg-white p-3 rounded border shadow-sm hover:shadow-md transition-shadow"
                >
                  {item.content}
                </DragAndDrop.Item>
              ))}
              {targetItems.length === 0 && (
                <div className="text-gray-500 text-center py-8">
                  アイテムをここにドロップ
                </div>
              )}
            </div>
          </DragAndDrop.DropZone>
        </div>
      </div>

      {/* 操作履歴 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">📝 操作履歴</h4>
        <div className="max-h-32 overflow-y-auto">
          {dropHistory.length === 0 ? (
            <p className="text-gray-500">まだ操作がありません</p>
          ) : (
            dropHistory
              .slice(-5)
              .reverse()
              .map((entry, index) => (
                <div
                  key={index}
                  className="text-sm py-1 border-b border-gray-200 last:border-b-0"
                >
                  {entry}
                </div>
              ))
          )}
        </div>
      </div>

      {/* リセットボタン */}
      <div className="text-center">
        <button
          onClick={() => {
            setItems([
              {
                id: 'item1',
                content: 'ドラッグ可能なアイテム 1',
                zone: 'source',
              },
              {
                id: 'item2',
                content: 'ドラッグ可能なアイテム 2',
                zone: 'source',
              },
              {
                id: 'item3',
                content: 'ドラッグ可能なアイテム 3',
                zone: 'source',
              },
            ]);
            setDropHistory([]);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          リセット
        </button>
      </div>
    </div>
  );
};

// カンバンボード風のテスト
const KanbanTest = () => {
  const [tasks, setTasks] = useState([
    { id: 'task1', title: 'ログイン機能の実装', status: 'todo' },
    { id: 'task2', title: 'データベース設計', status: 'todo' },
    { id: 'task3', title: 'API開発', status: 'doing' },
    { id: 'task4', title: 'テスト作成', status: 'doing' },
    { id: 'task5', title: 'デプロイ', status: 'done' },
  ]);

  const moveTask = (taskId: string, newStatus: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const getTasksByStatus = (status: string) =>
    tasks.filter((task) => task.status === status);

  const columns = [
    {
      id: 'todo',
      title: '📋 To Do',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      id: 'doing',
      title: '🚧 進行中',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
    {
      id: 'done',
      title: '✅ 完了',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center">カンバンボード テスト</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id}>
            <h3 className="text-lg font-semibold mb-4 text-center">
              {column.title}
            </h3>
            <DragAndDrop.DropZone
              onDrop={(taskId) => moveTask(taskId, column.id)}
              className={`${column.bgColor} border-2 ${column.borderColor} rounded-lg p-4 min-h-[300px]`}
            >
              <div className="space-y-3">
                {getTasksByStatus(column.id).map((task) => (
                  <DragAndDrop.Item
                    key={task.id}
                    itemId={task.id}
                    className="bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-grab"
                  >
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <span className="text-xs text-gray-500">#{task.id}</span>
                    </div>
                  </DragAndDrop.Item>
                ))}
                {getTasksByStatus(column.id).length === 0 && (
                  <div className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded">
                    タスクをここにドロップ
                  </div>
                )}
              </div>
            </DragAndDrop.DropZone>
          </div>
        ))}
      </div>

      {/* 統計 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">📊 統計</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          {columns.map((column) => (
            <div key={column.id} className="bg-white p-2 rounded">
              <div className="text-sm text-gray-600">{column.title}</div>
              <div className="text-xl font-bold">
                {getTasksByStatus(column.id).length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ネストされたドロップゾーンのテスト
interface FileItem {
  id: string;
  content: string;
  type: 'folder' | 'file';
  parent: string | null;
}

const NestedDropZoneTest = () => {
  const [items, setItems] = useState<FileItem[]>([
    { id: 'item1', content: 'フォルダA', type: 'folder', parent: null },
    { id: 'item2', content: 'ファイル1.txt', type: 'file', parent: null },
    { id: 'item3', content: 'ファイル2.pdf', type: 'file', parent: null },
    { id: 'item4', content: 'フォルダB', type: 'folder', parent: null },
    { id: 'item5', content: '画像.jpg', type: 'file', parent: 'item1' },
    {
      id: 'item6',
      content: 'ドキュメント.docx',
      type: 'file',
      parent: 'item4',
    },
  ]);

  const [expandedFolders, setExpandedFolders] = useState<string[]>([
    'item1',
    'item4',
  ]);

  const moveItem = (itemId: string, newParent: string | null) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, parent: newParent } : item
      )
    );
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    );
  };

  const getRootItems = () => items.filter((item) => item.parent === null);
  const getChildItems = (parentId: string) =>
    items.filter((item) => item.parent === parentId);

  const renderItem = (item: FileItem, level = 0) => {
    const isFolder = item.type === 'folder';
    const isExpanded = expandedFolders.includes(item.id);
    const childItems = getChildItems(item.id);
    const paddingLeft = level * 20;

    return (
      <div key={item.id} style={{ paddingLeft: `${paddingLeft}px` }}>
        <DragAndDrop.Item
          itemId={item.id}
          className={`
            bg-white p-2 mb-1 rounded border shadow-sm hover:shadow-md transition-shadow
            flex items-center gap-2 cursor-grab
            ${isFolder ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}
          `}
        >
          <div className="flex items-center gap-2 flex-1">
            {isFolder && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolder(item.id);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                {isExpanded ? '📂' : '📁'}
              </button>
            )}
            {!isFolder && <span>📄</span>}
            <span className="flex-1">{item.content}</span>
            {isFolder && (
              <span className="text-xs text-gray-500">
                ({childItems.length}個のアイテム)
              </span>
            )}
          </div>
        </DragAndDrop.Item>

        {/* ネストされたドロップゾーン（フォルダ用） */}
        {isFolder && isExpanded && (
          <div className="ml-4 mt-1">
            <DragAndDrop.DropZone
              isNested={true}
              onDrop={(itemId) => moveItem(itemId, item.id)}
              className="border-2 border-dashed border-blue-200 rounded p-2 min-h-[60px] bg-blue-25"
            >
              <div className="space-y-1">
                {childItems.map((childItem) =>
                  renderItem(childItem, level + 1)
                )}
                {childItems.length === 0 && (
                  <div className="text-gray-400 text-center py-2 text-sm">
                    フォルダは空です
                  </div>
                )}
              </div>
            </DragAndDrop.DropZone>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center">
        ネストされたドロップゾーン（ファイルエクスプローラー風）
      </h2>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">📝 使い方</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• ファイルやフォルダをドラッグして移動できます</li>
          <li>• フォルダアイコンをクリックで開閉できます</li>
          <li>• フォルダ内の点線エリアにドロップで中に移動</li>
          <li>• ルートエリアにドロップで最上位に移動</li>
        </ul>
      </div>

      <DragAndDrop className="bg-white border rounded-lg p-4">
        {/* ルートレベルのドロップゾーン */}
        <DragAndDrop.DropZone
          onDrop={(itemId) => moveItem(itemId, null)}
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[400px]"
        >
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700 mb-4">
              🗂️ ファイルエクスプローラー
            </h3>

            {getRootItems().map((item) => renderItem(item))}

            {getRootItems().length === 0 && (
              <div className="text-gray-500 text-center py-8">
                アイテムをここにドロップ
              </div>
            )}
          </div>
        </DragAndDrop.DropZone>
      </DragAndDrop>

      {/* 統計表示 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {items.filter((item) => item.type === 'folder').length}
          </div>
          <div className="text-sm text-blue-600">フォルダ</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {items.filter((item) => item.type === 'file').length}
          </div>
          <div className="text-sm text-green-600">ファイル</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            {items.filter((item) => item.parent === null).length}
          </div>
          <div className="text-sm text-purple-600">ルートアイテム</div>
        </div>
      </div>

      {/* リセットボタン */}
      <div className="text-center">
        <button
          onClick={() => {
            setItems([
              {
                id: 'item1',
                content: 'フォルダA',
                type: 'folder',
                parent: null,
              },
              {
                id: 'item2',
                content: 'ファイル1.txt',
                type: 'file',
                parent: null,
              },
              {
                id: 'item3',
                content: 'ファイル2.pdf',
                type: 'file',
                parent: null,
              },
              {
                id: 'item4',
                content: 'フォルダB',
                type: 'folder',
                parent: null,
              },
              {
                id: 'item5',
                content: '画像.jpg',
                type: 'file',
                parent: 'item1',
              },
              {
                id: 'item6',
                content: 'ドキュメント.docx',
                type: 'file',
                parent: 'item4',
              },
            ]);
            setExpandedFolders(['item1', 'item4']);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          リセット
        </button>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <BasicDragDropTest />,
};

export const KanbanBoard: Story = {
  render: () => <KanbanTest />,
};

export const NestedDropZones: Story = {
  render: () => <NestedDropZoneTest />,
};

export const Simple: Story = {
  args: {
    className: 'p-4',
  },
  render: () => (
    <DragAndDrop className="space-y-4">
      <div>
        <h3 className="mb-2 font-semibold">ドラッグ可能なアイテム:</h3>
        <DragAndDrop.Item
          itemId="simple1"
          className="bg-blue-100 p-2 rounded mb-2 inline-block"
        >
          シンプルなアイテム 1
        </DragAndDrop.Item>
        <DragAndDrop.Item
          itemId="simple2"
          className="bg-green-100 p-2 rounded mb-2 inline-block ml-2"
        >
          シンプルなアイテム 2
        </DragAndDrop.Item>
      </div>

      <DragAndDrop.DropZone
        onDrop={(itemId) => console.log(`Dropped: ${itemId}`)}
        className="border-2 border-dashed border-gray-300 p-8 text-center"
      >
        ここにドロップしてください
      </DragAndDrop.DropZone>
    </DragAndDrop>
  ),
};
