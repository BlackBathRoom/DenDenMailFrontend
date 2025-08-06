import type { Meta, StoryObj } from '@storybook/react-vite';
import PriorityForm from './index';

const meta: Meta<typeof PriorityForm> = {
  title: 'Pages/Settings/Components/PriorityForm',
  component: PriorityForm,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'フォームのタイトル',
    },
    label: {
      control: 'text',
      description: '入力フィールドのラベル',
    },
    contentType: {
      control: 'select',
      options: ['word', 'address'],
      description: 'コンテンツの種類',
    },
    onSubmit: {
      action: 'submitted',
      description: 'フォーム送信時のイベント',
    },
    placeholder: {
      control: 'object',
      description: '初期値設定用のプレースホルダー',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '新しい単語を追加',
    label: '単語',
    contentType: 'word',
    onSubmit: (word, level) => console.log(`追加: ${word} (レベル: ${level})`),
  },
};

export const WordEntry: Story = {
  args: {
    title: '優先単語登録',
    label: '単語',
    contentType: 'word',
    onSubmit: (word, level) =>
      console.log(`単語追加: ${word} (レベル: ${level})`),
  },
};

export const AddressEntry: Story = {
  args: {
    title: 'メールアドレス追加',
    label: 'メールアドレス',
    contentType: 'address',
    onSubmit: (address, level) =>
      console.log(`アドレス追加: ${address} (レベル: ${level})`),
  },
};

export const WithPlaceholder: Story = {
  args: {
    title: '単語編集',
    label: '単語',
    contentType: 'word',
    placeholder: {
      content: 'サンプル単語',
      level: 2,
    },
    onSubmit: (word, level) => console.log(`更新: ${word} (レベル: ${level})`),
  },
};

export const WithAlerts: Story = {
  args: {
    title: '新しい単語を追加',
    label: '単語',
    contentType: 'word',
    onSubmit: (word, level) => {
      alert(`追加されました！\n単語: ${word}\nレベル: ${level}`);
    },
  },
};

export const FormValidation: Story = {
  args: {
    title: 'バリデーション確認',
    label: '単語',
    contentType: 'word',
    onSubmit: (word, level) => {
      if (!word || word.length < 1) {
        alert('エラー: 単語を入力してください');
        return;
      }
      if (!level || level < 1) {
        alert('エラー: レベルは1以上で入力してください');
        return;
      }
      alert(`✅ 正常に追加されました: ${word} (レベル: ${level})`);
    },
  },
};

export const MultipleContentTypes: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <PriorityForm
        title="単語追加フォーム"
        label="単語"
        contentType="word"
        onSubmit={(word: string, level: number) =>
          console.log(`単語: ${word}, レベル: ${level}`)
        }
      />
      <div className="divider">または</div>
      <PriorityForm
        title="メールアドレス追加フォーム"
        label="メールアドレス"
        contentType="address"
        onSubmit={(address: string, level: number) =>
          console.log(`アドレス: ${address}, レベル: ${level}`)
        }
      />
    </div>
  ),
};

export const EditMode: Story = {
  render: () => (
    <div className="space-y-6 max-w-lg">
      <h2 className="text-xl font-bold">編集モード</h2>
      <PriorityForm
        title="単語を編集"
        label="単語"
        contentType="word"
        placeholder={{
          content: '既存の単語',
          level: 3,
        }}
        onSubmit={(word: string, level: number) =>
          alert(`更新: ${word} → レベル ${level}`)
        }
      />
    </div>
  ),
};

export const FormStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">新規追加</h3>
        <PriorityForm
          title="新しい単語"
          label="単語"
          contentType="word"
          onSubmit={(word: string, level: number) =>
            console.log(`新規: ${word} (${level})`)
          }
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">編集中</h3>
        <PriorityForm
          title="単語編集"
          label="単語"
          contentType="word"
          placeholder={{
            content: '編集対象',
            level: 1,
          }}
          onSubmit={(word: string, level: number) =>
            console.log(`編集: ${word} (${level})`)
          }
        />
      </div>
    </div>
  ),
};
