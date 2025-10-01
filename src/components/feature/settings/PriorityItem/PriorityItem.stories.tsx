import type { Meta, StoryObj } from '@storybook/react-vite';

import PriorityItem from './index';

const meta: Meta<typeof PriorityItem> = {
  title: 'Pages/Settings/PriorityItem',
  component: PriorityItem,
  parameters: {
    layout: 'center',
  },
  argTypes: {
    itemName: {
      control: 'text',
      description: 'アイテムの名前',
    },
    itemId: {
      control: 'text',
      description: 'アイテムのID',
    },
    iconClassName: {
      control: 'text',
      description: 'アイコンのCSSクラス名',
    },
    onClickDelete: {
      action: 'delete clicked',
      description: '削除ボタンクリック時のイベント',
    },
    onClickEdit: {
      action: 'edit clicked',
      description: '編集ボタンクリック時のイベント',
    },
    className: {
      control: 'text',
      description: '追加のCSSクラス',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itemName: 'デフォルトアイテム',
    itemId: 'item-1',
    onClickDelete: (id) => console.log(`Delete: ${id}`),
    onClickEdit: (id) => console.log(`Edit: ${id}`),
  },
};

export const SmallIcons: Story = {
  args: {
    itemName: '小さいアイコン',
    itemId: 'item-2',
    iconClassName: 'w-4 h-4',
    onClickDelete: (id) => console.log(`Delete: ${id}`),
    onClickEdit: (id) => console.log(`Edit: ${id}`),
  },
};

export const LargeIcons: Story = {
  args: {
    itemName: '大きいアイコン',
    itemId: 'item-3',
    iconClassName: 'w-8 h-8',
    onClickDelete: (id) => console.log(`Delete: ${id}`),
    onClickEdit: (id) => console.log(`Edit: ${id}`),
  },
};

export const LongItemName: Story = {
  args: {
    itemName:
      'とても長いアイテム名でレイアウトの確認をするためのサンプルテキスト',
    itemId: 'item-4',
    onClickDelete: (id) => console.log(`Delete: ${id}`),
    onClickEdit: (id) => console.log(`Edit: ${id}`),
  },
};

export const NumericId: Story = {
  args: {
    itemName: '数値IDのアイテム',
    itemId: 12345,
    onClickDelete: (id) => console.log(`Delete: ${id}`),
    onClickEdit: (id) => console.log(`Edit: ${id}`),
  },
};

export const WithCustomClass: Story = {
  args: {
    itemName: 'カスタムクラス付き',
    itemId: 'item-5',
    className: 'bg-gray-100 p-4 rounded-lg',
    onClickDelete: (id) => console.log(`Delete: ${id}`),
    onClickEdit: (id) => console.log(`Edit: ${id}`),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <PriorityItem
        itemName="極小アイコン"
        itemId="xs"
        iconClassName="w-3 h-3"
        onClickDelete={(id) => console.log(`Delete: ${id}`)}
        onClickEdit={(id) => console.log(`Edit: ${id}`)}
      />
      <PriorityItem
        itemName="小アイコン"
        itemId="sm"
        iconClassName="w-4 h-4"
        onClickDelete={(id) => console.log(`Delete: ${id}`)}
        onClickEdit={(id) => console.log(`Edit: ${id}`)}
      />
      <PriorityItem
        itemName="中アイコン"
        itemId="md"
        iconClassName="w-6 h-6"
        onClickDelete={(id) => console.log(`Delete: ${id}`)}
        onClickEdit={(id) => console.log(`Edit: ${id}`)}
      />
      <PriorityItem
        itemName="大アイコン"
        itemId="lg"
        iconClassName="w-8 h-8"
        onClickDelete={(id) => console.log(`Delete: ${id}`)}
        onClickEdit={(id) => console.log(`Edit: ${id}`)}
      />
      <PriorityItem
        itemName="極大アイコン"
        itemId="xl"
        iconClassName="w-10 h-10"
        onClickDelete={(id) => console.log(`Delete: ${id}`)}
        onClickEdit={(id) => console.log(`Edit: ${id}`)}
      />
    </div>
  ),
};

export const ItemList: Story = {
  render: () => (
    <div className="max-w-md space-y-2">
      <h3 className="mb-4 text-lg font-semibold">優先アイテムリスト</h3>
      <PriorityItem
        itemName="緊急タスク"
        itemId="urgent-task"
        className="border-l-4 border-red-500 pl-4"
        iconClassName="w-5 h-5"
        onClickDelete={(id) => alert(`削除: ${id}`)}
        onClickEdit={(id) => alert(`編集: ${id}`)}
      />
      <PriorityItem
        itemName="重要なメール返信"
        itemId="important-email"
        className="border-l-4 border-yellow-500 pl-4"
        iconClassName="w-5 h-5"
        onClickDelete={(id) => alert(`削除: ${id}`)}
        onClickEdit={(id) => alert(`編集: ${id}`)}
      />
      <PriorityItem
        itemName="日常業務"
        itemId="daily-task"
        className="border-l-4 border-green-500 pl-4"
        iconClassName="w-5 h-5"
        onClickDelete={(id) => alert(`削除: ${id}`)}
        onClickEdit={(id) => alert(`編集: ${id}`)}
      />
    </div>
  ),
};

export const CustomIconStyles: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <PriorityItem
        itemName="カラーアイコン"
        itemId="colored"
        iconClassName="w-6 h-6 text-blue-500"
        onClickDelete={(id) => console.log(`Delete: ${id}`)}
        onClickEdit={(id) => console.log(`Edit: ${id}`)}
      />
      <PriorityItem
        itemName="太いアイコン"
        itemId="thick"
        iconClassName="w-6 h-6 stroke-2"
        onClickDelete={(id) => console.log(`Delete: ${id}`)}
        onClickEdit={(id) => console.log(`Edit: ${id}`)}
      />
      <PriorityItem
        itemName="カスタムスタイル"
        itemId="custom"
        iconClassName="w-6 h-6 text-purple-600 drop-shadow-lg"
        onClickDelete={(id) => console.log(`Delete: ${id}`)}
        onClickEdit={(id) => console.log(`Edit: ${id}`)}
      />
    </div>
  ),
};
