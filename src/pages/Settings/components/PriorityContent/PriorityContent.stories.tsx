import type { Meta, StoryObj } from '@storybook/react-vite';
import PriorityContent from './index';

const meta: Meta<typeof PriorityContent> = {
  title: 'Pages/Settings/Components/PriorityContent',
  component: PriorityContent,
  parameters: {
    layout: 'padded',
  },
  args: {
    // 追加された必須propsのデフォルト
    contentName: '優先コンテンツ',
    contentType: 'word',
  },
  argTypes: {
    contentName: {
      control: 'text',
      description: 'フォームやラベルに使われる名称（例: 優先辞書）',
    },
    contentType: {
      control: { type: 'inline-radio' },
      options: ['word', 'address'],
      description: 'コンテンツの種類',
    },
    initialContents: {
      control: 'object',
      description: '初期コンテンツの配列',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleContents = [
  { id: 'content1', content: '重要なコンテンツ', level: 1 },
  { id: 'content2', content: 'テスト用語', level: 1 },
  { id: 'content3', content: 'サンプル', level: 2 },
  { id: 'content4', content: 'プライオリティ', level: 2 },
  { id: 'content5', content: '緊急事項', level: 3 },
];

export const Default: Story = {
  args: {
    initialContents: sampleContents,
  },
};

export const EmptyState: Story = {
  args: {
    initialContents: [],
  },
};

export const SingleLevel: Story = {
  args: {
    initialContents: [
      { id: 'content1', content: '単一レベル1', level: 1 },
      { id: 'content2', content: '単一レベル2', level: 1 },
      { id: 'content3', content: '単一レベル3', level: 1 },
    ],
  },
};

export const ManyLevels: Story = {
  args: {
    initialContents: [
      { id: 'content1', content: 'レベル1-1', level: 1 },
      { id: 'content2', content: 'レベル1-2', level: 1 },
      { id: 'content3', content: 'レベル2-1', level: 2 },
      { id: 'content4', content: 'レベル3-1', level: 3 },
      { id: 'content5', content: 'レベル4-1', level: 4 },
      { id: 'content6', content: 'レベル4-2', level: 4 },
      { id: 'content7', content: 'レベル5-1', level: 5 },
    ],
  },
};

export const LongContents: Story = {
  args: {
    initialContents: [
      {
        id: 'content1',
        content:
          'とても長いコンテンツでレイアウトの確認をするためのサンプルテキスト',
        level: 1,
      },
      { id: 'content2', content: '短い語', level: 1 },
      {
        id: 'content3',
        content: 'アプリケーション開発における重要な考慮事項',
        level: 2,
      },
      { id: 'content4', content: 'UI/UX', level: 2 },
    ],
  },
};

export const WithInteraction: Story = {
  args: {
    initialContents: sampleContents,
  },
};

export const WithFormDemo: Story = {
  render: (args) => {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold">フォーム機能のデモ</h3>
          <p className="text-sm">
            「+
            新しいコンテンツを追加」ボタンをクリックしてフォームを試してください
          </p>
        </div>
        <PriorityContent {...args} initialContents={[]} />
      </div>
    );
  },
};

export const InteractiveDemo: Story = {
  render: (args) => {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-gray-100 p-4">
          <h3 className="mb-2 font-semibold">操作説明</h3>
          <ul className="space-y-1 text-sm">
            <li>• 「+ 新しいコンテンツを追加」ボタンでコンテンツを追加</li>
            <li>• コンテンツをドラッグして他のレベルに移動できます</li>
            <li>• 編集ボタン（鉛筆）をクリックで編集</li>
            <li>• 削除ボタン（ゴミ箱）をクリックで削除</li>
          </ul>
        </div>
        <PriorityContent {...args} initialContents={sampleContents} />
        <div className="rounded bg-blue-50 p-3 text-sm">
          コンポーネント内でステート管理されています
        </div>
      </div>
    );
  },
};
