import Collapse from '../../components/ui/Collapse';
import Panel from '../../components/ui/Panel';
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

const Settings: React.FC = () => {
  return (
    <Panel>
      <div className="join join-horizontal">
        <Collapse icon="arrow" name="setting" className="join-item">
          <Collapse.Title className="text-lg font-semibold">
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
      </div>
    </Panel>
  );
};

export default Settings;
