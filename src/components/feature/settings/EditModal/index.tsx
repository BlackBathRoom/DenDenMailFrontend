import { useState } from 'react';

import {
  ADDRESS_MODAL_IDS,
  DICTIONARY_MODAL_IDS,
} from '@/hooks/useSettings/constants';
import type { Target } from '@/hooks/useSettings/type';
import Form from '@/components/ui/Form';
import Modal from '@/components/ui/Modal';
import { PRIORITY_MAX_LEVEL, PRIORITY_MIN_LEVEL } from '@/constants';

type Props = {
  target: Target | null;
  modalId:
    | (typeof ADDRESS_MODAL_IDS)['edit']
    | (typeof DICTIONARY_MODAL_IDS)['edit'];
  onSubmit: (id: number, level: number) => void;
};

const EditModal: React.FC<Props> = ({ target, modalId, onSubmit }) => {
  const [level, setLevel] = useState<number>(target?.level || 1);

  if (!target) return null;

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!level) return;
    onSubmit(target.id, level);
  };

  return (
    <Modal modalId={modalId}>
      <Form onSubmit={handleEditSubmit} className="flex flex-col gap-7">
        <h3 className="text-lg font-semibold">
          <span>
            {modalId === DICTIONARY_MODAL_IDS.edit ? '単語' : 'アドレス'}
          </span>
          <span>優先度レベル編集</span>
        </h3>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Form.Label>word: {target.label}</Form.Label>
            <Form.Input
              value={level}
              setValue={(val) => setLevel(Number(val))}
              min={PRIORITY_MIN_LEVEL}
              max={PRIORITY_MAX_LEVEL}
              errorMessage="レベルは1以上3以下の整数で入力してください"
              isRequired
            />
          </div>
        </div>
        <Form.SubmitBtn color="primary">編集</Form.SubmitBtn>
      </Form>
    </Modal>
  );
};

export default EditModal;
