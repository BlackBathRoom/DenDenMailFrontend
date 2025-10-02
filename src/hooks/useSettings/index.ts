import React, { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useModal } from '@/hooks/useModal';
import { DICTIONARY_MODAL_IDS } from '@/hooks/useSettings/constants';
import type { Target } from '@/hooks/useSettings/type';
import DictionaryAddModal from '@/components/feature/settings/DictionaryAddModal';
import EditModal from '@/components/feature/settings/EditModal';
import { getPriorityAddressesOptions } from '@/api/routers/rules/addresses';
import {
  getPriorityDictionaryOptions,
  useRegisterPriorityDictionary,
  useUpdatePriorityDictionary,
} from '@/api/routers/rules/dictionaries';
import type { PriorityAddress, PriorityDictionary } from '@/types';

const resolveLevels = (data: { level: number }[]) =>
  [...new Set(data.map((d) => d.level))].sort((a, b) => b - a);

type ContentSet<T> = {
  data: T[];
  levels: number[];
};

type BaseModal = {
  close: () => void;
  Component: React.FC;
};

type AddModal = {
  open: () => void;
  Component: React.FC;
} & BaseModal;

type EditModal = {
  open: (target: Target) => void;
} & BaseModal;

type Return = {
  priorityAddress: ContentSet<PriorityAddress>;
  priorityDictionary: ContentSet<PriorityDictionary>;
  modals: {
    addDictionary: AddModal;
    editDictionary: EditModal;
  };
  updateFn: {
    dictionary: (id: number, level: number) => void;
  };
};

export const useSettings = (): Return => {
  const { data: priorityAddresses } = useSuspenseQuery(
    getPriorityAddressesOptions()
  );
  const { data: priorityDictionary } = useSuspenseQuery(
    getPriorityDictionaryOptions()
  );
  const [editContent, setEditContent] = useState<null | Target>(null);

  const addDictionaryMutate = useRegisterPriorityDictionary();
  const updateDictionaryMutate = useUpdatePriorityDictionary();

  const _addDictionaryModal = useModal(DICTIONARY_MODAL_IDS.add);
  const _editDictionaryModal = useModal(DICTIONARY_MODAL_IDS.edit);

  const AddDictionaryModal: React.FC = () =>
    DictionaryAddModal({
      onSubmit: (word: string, level: number) => {
        addDictionaryMutate({ word: word, priority: level });
        _addDictionaryModal.closeModal();
      },
    });

  const UpdateDictionaryModal: React.FC = () =>
    EditModal({
      modalId: DICTIONARY_MODAL_IDS.edit,
      target: editContent,
      onSubmit: (id: number, targetLevel: number) => {
        updateDictionaryMutate({ id, priority: targetLevel });
        _editDictionaryModal.closeModal();
        setEditContent(null);
      },
    });

  const openEditModal = (target: Target, modalOpenFn: () => void) => {
    setEditContent(target);
    setTimeout(() => modalOpenFn(), 0);
  };

  return {
    priorityAddress: {
      data: priorityAddresses,
      levels: resolveLevels(priorityAddresses),
    },
    priorityDictionary: {
      data: priorityDictionary,
      levels: resolveLevels(priorityDictionary),
    },
    modals: {
      addDictionary: {
        open: _addDictionaryModal.openModal,
        close: _addDictionaryModal.closeModal,
        Component: AddDictionaryModal,
      },
      editDictionary: {
        open: (target: Target) =>
          openEditModal(target, _editDictionaryModal.openModal),
        close: _editDictionaryModal.closeModal,
        Component: UpdateDictionaryModal,
      },
    },
    updateFn: {
      dictionary: (id: number, level: number) =>
        updateDictionaryMutate({ id, priority: level }),
    },
  };
};
