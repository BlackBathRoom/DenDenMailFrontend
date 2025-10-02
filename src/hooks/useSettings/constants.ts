type ModalIdMap<T extends string> = {
  add: `add-${T}-modal`;
  edit: `edit-${T}-modal`;
};

const createModalIdMap = <T extends string>(symbol: T): ModalIdMap<T> =>
  ({
    add: `add-${symbol}-modal`,
    edit: `edit-${symbol}-modal`,
  }) as const;

const ADDRESS_MODAL_IDS = createModalIdMap('address');
const DICTIONARY_MODAL_IDS = createModalIdMap('dictionary');

export { ADDRESS_MODAL_IDS, DICTIONARY_MODAL_IDS };
