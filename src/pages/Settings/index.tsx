import Collapse from '@/components/ui/Collapse';
import Panel from '@/components/ui/Panel';

import PriorityContent from './components/PriorityContent';

const _contents = [
  {
    id: 'hogehoge',
    content: 'ほげほげ',
    level: 1,
  },
  {
    id: 'fugafuga',
    content: 'ふがふが',
    level: 2,
  },
  {
    id: 'piyopiyo',
    content: 'ぴよぴよ',
    level: 3,
  },
];

const _emails = [
  {
    id: '123',
    content: 'hoge@example.com',
    level: 1,
  },
  {
    id: '456',
    content: 'fuga@example.com',
    level: 2,
  },
  {
    id: '789',
    content: 'piyo@example.com',
    level: 3,
  },
];

const Settings: React.FC = () => {
  return (
    <Panel className="scrollbar-hidden flex h-full max-h-[calc(100dvh-129.9px)] w-full flex-col items-center gap-3 overflow-y-auto p-5">
      <div className="flex w-full max-w-xl flex-col items-start gap-2">
        <h2 className="mb-5 text-4xl font-semibold">優先度フィルター系</h2>
        <div className="join-vertical join w-full max-w-xl">
          <Collapse
            icon="arrow"
            name="settings"
            className="join-item border border-primary"
          >
            <Collapse.Title className="text-3xl font-semibold">
              優先辞書登録
            </Collapse.Title>
            <Collapse.Content className="p-4">
              <PriorityContent
                contentName="優先辞書"
                contentType="word"
                initialContents={_contents}
              />
            </Collapse.Content>
          </Collapse>
          <Collapse
            icon="arrow"
            name="settings"
            className="join-item border border-primary"
          >
            <Collapse.Title className="text-3xl font-semibold">
              優先メールアドレス登録
            </Collapse.Title>
            <Collapse.Content className="p-4">
              <PriorityContent
                contentName="優先メールアドレス"
                contentType="address"
                initialContents={_emails}
              />
            </Collapse.Content>
          </Collapse>
        </div>
      </div>
    </Panel>
  );
};

export default Settings;
