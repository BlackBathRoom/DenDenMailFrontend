import React, { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useModal } from '@/hooks/useModal';
import {
  ADDRESS_MODAL_IDS,
  DICTIONARY_MODAL_IDS,
} from '@/hooks/useSettings/constants';
import type { Target } from '@/hooks/useSettings/type';
import AddressAddModal from '@/components/feature/settings/AddressAddModal';
import DictionaryAddModal from '@/components/feature/settings/DictionaryAddModal';
import EditModal from '@/components/feature/settings/EditModal';
import { getAddressesOptions } from '@/api/routers/messages/addresses';
import {
  getPriorityAddressesOptions,
  useDeletePriorityAddress,
  useRegisterPriorityAddress,
  useUpdatePriorityAddress,
} from '@/api/routers/rules/addresses';
import {
  getPriorityDictionaryOptions,
  useDeletePriorityDictionary,
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

type UpdateFn = (id: number, level: number) => void;
type DeleteFn = (id: number) => void;

type Return = {
  priorityAddress: ContentSet<PriorityAddress>;
  priorityDictionary: ContentSet<PriorityDictionary>;
  modals: {
    addAddress: AddModal;
    editAddress: EditModal;
    addDictionary: AddModal;
    editDictionary: EditModal;
  };
  updateFn: {
    address: UpdateFn;
    dictionary: UpdateFn;
  };
  deleteFn: {
    address: DeleteFn;
    dictionary: DeleteFn;
  };
};

export const useSettings = (): Return => {
  // queries
  const { data: priorityAddresses } = useSuspenseQuery(
    getPriorityAddressesOptions()
  );
  const { data: priorityDictionary } = useSuspenseQuery(
    getPriorityDictionaryOptions()
  );
  const { data: addresses } = useSuspenseQuery(getAddressesOptions());

  const [editContent, setEditContent] = useState<null | Target>(null);

  // mutations
  const addAddressMutate = useRegisterPriorityAddress();
  const updateAddressMutate = useUpdatePriorityAddress();
  const deleteAddressMutate = useDeletePriorityAddress();

  const addDictionaryMutate = useRegisterPriorityDictionary();
  const updateDictionaryMutate = useUpdatePriorityDictionary();
  const deleteDictionaryMutate = useDeletePriorityDictionary();

  // modal functions
  const addAddressModal = useModal(ADDRESS_MODAL_IDS.add);
  const editAddressModal = useModal(ADDRESS_MODAL_IDS.edit);

  const addDictionaryModal = useModal(DICTIONARY_MODAL_IDS.add);
  const editDictionaryModal = useModal(DICTIONARY_MODAL_IDS.edit);

  // modal components
  const AddAddressModal: React.FC = () =>
    AddressAddModal({
      addresses: addresses.filter(
        (addr) => !priorityAddresses.some((p) => p.address === addr.address)
      ),
      onSubmit: (address_id: number, level: number) =>
        addAddressMutate({ address_id, priority: level }),
    });

  const UpdateAddressModal: React.FC = () =>
    EditModal({
      modalId: ADDRESS_MODAL_IDS.edit,
      target: editContent,
      onSubmit: (id: number, targetLevel: number) => {
        updateAddressMutate({ id, priority: targetLevel });
        editAddressModal.closeModal();
        setEditContent(null);
      },
    });

  const AddDictionaryModal: React.FC = () =>
    DictionaryAddModal({
      onSubmit: (word: string, level: number) => {
        addDictionaryMutate({ word: word, priority: level });
        addDictionaryModal.closeModal();
      },
    });

  const UpdateDictionaryModal: React.FC = () =>
    EditModal({
      modalId: DICTIONARY_MODAL_IDS.edit,
      target: editContent,
      onSubmit: (id: number, targetLevel: number) => {
        updateDictionaryMutate({ id, priority: targetLevel });
        editDictionaryModal.closeModal();
        setEditContent(null);
      },
    });

  // helpers
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
      addAddress: {
        open: addAddressModal.openModal,
        close: addAddressModal.closeModal,
        Component: AddAddressModal,
      },
      editAddress: {
        open: (target: Target) =>
          openEditModal(target, editAddressModal.openModal),
        close: editAddressModal.closeModal,
        Component: UpdateAddressModal,
      },
      addDictionary: {
        open: addDictionaryModal.openModal,
        close: addDictionaryModal.closeModal,
        Component: AddDictionaryModal,
      },
      editDictionary: {
        open: (target: Target) =>
          openEditModal(target, editDictionaryModal.openModal),
        close: editDictionaryModal.closeModal,
        Component: UpdateDictionaryModal,
      },
    },
    updateFn: {
      address: (id: number, level: number) =>
        updateAddressMutate({ id, priority: level }),
      dictionary: (id: number, level: number) =>
        updateDictionaryMutate({ id, priority: level }),
    },
    deleteFn: {
      address: (id: number) => deleteAddressMutate(id),
      dictionary: (id: number) => deleteDictionaryMutate(id),
    },
  };
};
