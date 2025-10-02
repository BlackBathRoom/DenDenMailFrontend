import type React from 'react';
import { useState } from 'react';

import { ADDRESS_MODAL_IDS } from '@/hooks/useSettings/constants';
import Form from '@/components/ui/Form';
import Modal from '@/components/ui/Modal';
import { PRIORITY_MAX_LEVEL, PRIORITY_MIN_LEVEL } from '@/constants';
import type { AddressInfo } from '@/types';

type Props = {
  addresses: AddressInfo[];
  onSubmit: (address_id: number, level: number) => void;
};

const AddressAddModal: React.FC<Props> = ({ addresses, onSubmit }) => {
  const [option, setOption] = useState<AddressInfo | null>(null);
  const [level, setLevel] = useState<number>(1);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!option) return;
    onSubmit(option.id, level);
    setOption(null);
  };

  return (
    <Modal modalId={ADDRESS_MODAL_IDS.add}>
      <Form onSubmit={handleAddSubmit} className="flex flex-col gap-7">
        <h3 className="text-2xl font-bold mb-3">新規アドレス追加</h3>
        <div className="flex flex-col gap-7 items-start min-w-72 mx-auto px-5">
          <div className="flex flex-col gap-5">
            <Form.Label htmlFor="add-address-select">address</Form.Label>
            <Form.Select
              id="add-address-select"
              label={'優先するアドレスを選択'}
              options={addresses.map((addr) => ({
                id: addr.id,
                label: addr.displayName
                  ? `${addr.displayName} (${addr.address})`
                  : addr.address,
              }))}
              setSelectOption={(id) => {
                setOption(addresses.find((addr) => addr.id === id) || null);
              }}
            />
          </div>
          <div className="flex flex-col gap-5">
            <Form.Label htmlFor="add-address-level">level</Form.Label>
            <Form.Input
              id="add-address-level"
              value={level}
              setValue={(val) => setLevel(Number(val))}
              min={PRIORITY_MIN_LEVEL}
              max={PRIORITY_MAX_LEVEL}
              errorMessage="レベルは1以上3以下の整数で入力してください"
              isRequired
            />
          </div>
        </div>
        <Form.SubmitBtn color="primary">追加</Form.SubmitBtn>
      </Form>
    </Modal>
  );
};

export default AddressAddModal;
