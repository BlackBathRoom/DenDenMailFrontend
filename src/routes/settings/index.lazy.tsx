import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { PencilIcon, TrashIcon } from 'lucide-react';

import { useModal } from '@/hooks/useModal';
import Divider from '@/components/layout/Divider';
import Collapse from '@/components/ui/Collapse';
import DragAndDrop from '@/components/ui/DragAndDrop';
import Modal from '@/components/ui/Modal';
import {
  getPriorityDictionaryOptions,
  useRegisterPriorityDictionary,
  useUpdatePriorityDictionary,
} from '@/api/routers/rules/dictionaries';
import { PRIORITY_MAX_LEVEL, PRIORITY_MIN_LEVEL } from '@/constants';

export const Route = createLazyFileRoute('/settings/')({
  component: RouteComponent,
});

const createModalIdMap = <T extends string>(
  symbol: T
): {
  add: `add-${T}-modal`;
  edit: `edit-${T}-modal`;
} =>
  ({
    add: `add-${symbol}-modal`,
    edit: `edit-${symbol}-modal`,
  }) as const;

function RouteComponent() {
  const { data: dictionaries } = useSuspenseQuery(
    getPriorityDictionaryOptions()
  );

  const addDictionaryMutate = useRegisterPriorityDictionary();
  const updateDictionaryMutate = useUpdatePriorityDictionary();

  const [editContent, setEditContent] = useState<null | {
    id: string;
    content: string;
    level: number;
  }>(null);
  const [level, setLevel] = useState<number | undefined>(undefined);
  const [addContent, setAddContent] = useState<string>('');

  const dictionaryModalIdMap = createModalIdMap('dictionary');

  const addDictionaryModal = useModal(dictionaryModalIdMap.add);
  const editDictionaryModal = useModal(dictionaryModalIdMap.edit);

  const addFn = (word: string, level: number) => {
    addDictionaryMutate({ word: word, priority: level });
  };

  const updateFn = (content_id: number, targetLevel: number) => {
    updateDictionaryMutate({ id: content_id, priority: targetLevel });
  };

  const deleteFn = (content_id: number) => {
    console.log('delete', content_id);
  };

  const contentLevels = [
    ...new Set(dictionaries.map((content) => content.level)),
  ].sort((a, b) => b - a);

  const handleAddSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!level) return;
    addFn(addContent || '', level);
    setLevel(undefined);
    addDictionaryModal.closeModal();
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!level) return;
    if (editContent) {
      updateFn(parseInt(editContent.id), level);
      setEditContent(null);
      editDictionaryModal.closeModal();
    }
  };

  return (
    <>
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
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditContent(null);
                    setLevel(undefined);
                    addDictionaryModal.openModal();
                  }}
                >
                  + 新しい単語を追加
                </button>
              </div>
              <DragAndDrop className="flex w-full flex-col gap-5">
                {contentLevels.map((level, i) => (
                  <>
                    <div
                      key={level}
                      className="flex w-full flex-col items-start gap-2"
                    >
                      <h4 className="text-lg font-semibold">レベル {level}</h4>
                      <DragAndDrop.DropZone
                        className="flex w-full max-w-xl flex-col gap-5 rounded-lg border p-4"
                        onDrop={(itemId: string) =>
                          updateFn(parseInt(itemId), level)
                        }
                      >
                        {dictionaries
                          .filter((word) => word.level === level)
                          .map((word) => (
                            <DragAndDrop.Item
                              key={word.id}
                              itemId={word.id.toString()}
                            >
                              <div className="flex items-center justify-between">
                                <span>{word.word}</span>
                                <div className="flex h-full gap-2">
                                  <button
                                    className="btn btn-square h-fit w-fit p-1 btn-info"
                                    onClick={() => {
                                      setEditContent({
                                        id: word.id.toString(),
                                        content: word.word,
                                        level: word.level,
                                      });
                                      setLevel(word.level);
                                      editDictionaryModal.openModal();
                                    }}
                                  >
                                    <PencilIcon className="w-6 h-6" />
                                  </button>
                                  <button
                                    className="btn btn-square h-fit w-fit p-1 btn-error"
                                    onClick={() => deleteFn(word.id)}
                                  >
                                    <TrashIcon className="w-6 h-6" />
                                  </button>
                                </div>
                              </div>
                            </DragAndDrop.Item>
                          ))}
                      </DragAndDrop.DropZone>
                    </div>
                    {i < contentLevels.length - 1 && (
                      <Divider direction="horizontal" color="accent" />
                    )}
                  </>
                ))}
              </DragAndDrop>
            </Collapse.Content>
          </Collapse>
        </div>
      </div>
      <Modal modalId={dictionaryModalIdMap.add}>
        <form onSubmit={handleAddSubmit} className="flex flex-col gap-7">
          <h3 className="text-lg font-semibold">新規単語追加</h3>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label className="label">word</label>
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  value={addContent}
                  onChange={(e) => setAddContent(e.target.value)}
                  placeholder={'単語を入力してください'}
                  className="validator input"
                  required
                  minLength={1}
                  title="単語は1文字以上で入力してください"
                />
                <p className="validator-hint">
                  単語は1文字以上で入力してください
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="label">level</label>
              <div className="flex flex-col gap-1">
                <input
                  type="number"
                  value={level || ''}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  min={PRIORITY_MIN_LEVEL}
                  max={PRIORITY_MAX_LEVEL}
                  className="validator input"
                  required
                  title="レベルは1以上の整数で入力してください"
                />
                <p className="validator-hint">
                  登録する単語のレベルは1以上の整数で入力してください
                </p>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              追加
            </button>
          </div>
        </form>
      </Modal>
      <Modal modalId={dictionaryModalIdMap.edit}>
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-7">
          <h3 className="text-lg font-semibold">単語優先度レベル編集</h3>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label className="label">
                word: {editContent ? editContent.content : ''}
              </label>
              <div className="flex flex-col gap-1">
                <input
                  type="number"
                  value={level || ''}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  min={PRIORITY_MIN_LEVEL}
                  max={PRIORITY_MAX_LEVEL}
                  className="validator input"
                  required
                  title="レベルは1以上の整数で入力してください"
                />
                <p className="validator-hint">
                  登録する単語のレベルは1以上の整数で入力してください
                </p>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              編集
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
