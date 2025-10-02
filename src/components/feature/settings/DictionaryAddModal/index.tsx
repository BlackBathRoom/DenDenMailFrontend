import { useState } from 'react';

import { DICTIONARY_MODAL_IDS } from '@/hooks/useSettings/constants';
import Form from '@/components/ui/Form';
import Modal from '@/components/ui/Modal';
import { PRIORITY_MAX_LEVEL, PRIORITY_MIN_LEVEL } from '@/constants';

type Props = {
  onSubmit: (word: string, level: number) => void;
};

const DictionaryAddModal: React.FC<Props> = ({ onSubmit }) => {
  const [addContent, setAddContent] = useState<string>('');
  const [level, setLevel] = useState<number>(1);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!level || addContent.length === 0) return;
    onSubmit(addContent, level);
    setAddContent('');
    setLevel(1);
  };

  return (
    <Modal modalId={DICTIONARY_MODAL_IDS.add}>
      <Form onSubmit={handleAddSubmit} className="flex flex-col gap-7">
        <h3 className="text-2xl font-bold mb-3">新規単語追加</h3>
        <div className="flex flex-col gap-5">
          <Form.Label>word</Form.Label>
          <Form.Input
            value={addContent}
            setValue={setAddContent}
            errorMessage="単語は1文字以上で入力してください"
            minLength={1}
            isRequired
          />
        </div>
        <div className="flex flex-col gap-5">
          <Form.Label>level</Form.Label>
          <Form.Input
            value={level}
            setValue={(val) => setLevel(Number(val))}
            min={PRIORITY_MIN_LEVEL}
            max={PRIORITY_MAX_LEVEL}
            errorMessage="レベルは1以上3以下の整数で入力してください"
            isRequired
          />
        </div>
        <Form.SubmitBtn color="primary">追加</Form.SubmitBtn>
      </Form>
    </Modal>
  );
};

export default DictionaryAddModal;
