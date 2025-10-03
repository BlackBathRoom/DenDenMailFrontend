import { createLazyFileRoute } from '@tanstack/react-router';
import { PencilIcon, TrashIcon } from 'lucide-react';

import { useSettings } from '@/hooks/useSettings';
import { useTheme } from '@/hooks/useTheme';
import Divider from '@/components/layout/Divider';
import Button from '@/components/ui/Button';
import Collapse from '@/components/ui/Collapse';
import DragAndDrop from '@/components/ui/DragAndDrop';

export const Route = createLazyFileRoute('/settings/')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    priorityAddress,
    priorityDictionary,
    modals: { addAddress, editAddress, addDictionary, editDictionary },
    updateFn,
    deleteFn,
  } = useSettings();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex w-full max-w-xl flex-col items-start gap-10 p-5">
        <div className="flex flex-col gap-5 w-full">
          <h2 className="mb-2 text-5xl font-bold">テーマ</h2>
          <div className="join join-horizontal mx-auto">
            {(['light', 'system', 'dark'] as const).map((t) => (
              <button
                key={t}
                className={`btn join-item ${
                  theme === t ? 'btn-primary' : 'btn-outline'
                }`}
                onClick={() => setTheme(t)}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <h2 className="mb-5 text-4xl font-semibold">優先度フィルター系</h2>
          <div className="join-vertical join w-full max-w-xl mx-auto">
            <Collapse
              icon="arrow"
              name="settings"
              className="join-item border border-primary"
            >
              <Collapse.Title className="text-3xl font-semibold">
                優先辞書登録
              </Collapse.Title>
              <Collapse.Content className="p-4 flex flex-col gap-4">
                <Button color="primary" onClick={addDictionary.open}>
                  + 新しい単語を追加
                </Button>
                <DragAndDrop className="flex w-full flex-col gap-5">
                  {priorityDictionary.levels.map((level, i) => (
                    <div key={level} className="contents">
                      <div className="flex w-full flex-col items-start gap-2">
                        <h4 className="text-lg font-semibold">
                          レベル {level}
                        </h4>
                        <DragAndDrop.DropZone
                          className="flex w-full max-w-xl flex-col gap-5 rounded-lg border p-4"
                          onDrop={(itemId: string) =>
                            updateFn.dictionary(parseInt(itemId), level)
                          }
                        >
                          {priorityDictionary.data
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
                                        editDictionary.open({
                                          id: word.id,
                                          label: word.word,
                                          level: word.level,
                                        });
                                      }}
                                    >
                                      <PencilIcon className="w-6 h-6" />
                                    </button>
                                    <button
                                      className="btn btn-square h-fit w-fit p-1 btn-error"
                                      onClick={() =>
                                        deleteFn.dictionary(word.id)
                                      }
                                    >
                                      <TrashIcon className="w-6 h-6" />
                                    </button>
                                  </div>
                                </div>
                              </DragAndDrop.Item>
                            ))}
                        </DragAndDrop.DropZone>
                      </div>
                      {i < priorityDictionary.levels.length - 1 && (
                        <Divider direction="horizontal" color="accent" />
                      )}
                    </div>
                  ))}
                </DragAndDrop>
              </Collapse.Content>
            </Collapse>
            <Collapse
              icon="arrow"
              name="settings"
              className="join-item border border-primary"
            >
              <Collapse.Title className="text-3xl font-semibold">
                優先アドレス登録
              </Collapse.Title>
              <Collapse.Content className="p-4 flex flex-col gap-4">
                <Button color="primary" onClick={addAddress.open}>
                  + 新しいアドレスを追加
                </Button>
                <DragAndDrop className="flex w-full flex-col gap-5">
                  {priorityAddress.levels.map((level, i) => (
                    <div key={level} className="contents">
                      <div className="flex w-full flex-col items-start gap-2">
                        <h4 className="text-lg font-semibold">
                          レベル {level}
                        </h4>
                        <DragAndDrop.DropZone
                          onDrop={(itemId: string) =>
                            updateFn.address(parseInt(itemId), level)
                          }
                          className="flex w-full max-w-xl flex-col gap-5 rounded-lg border p-4"
                        >
                          {priorityAddress.data
                            .filter((addr) => addr.level === level)
                            .map((addr) => (
                              <DragAndDrop.Item
                                key={addr.id}
                                itemId={addr.id.toString()}
                              >
                                <div className="flex items-center justify-between">
                                  <span>
                                    {addr.displayName
                                      ? `${addr.displayName} (${addr.address})`
                                      : addr.address}
                                  </span>
                                  <div className="flex h-full gap-2">
                                    <button
                                      onClick={() => {
                                        editAddress.open({
                                          id: addr.id,
                                          label: addr.address,
                                          level: addr.level,
                                        });
                                      }}
                                      className="btn btn-square h-fit w-fit p-1 btn-info"
                                    >
                                      <PencilIcon className="w-6 h-6" />
                                    </button>
                                    <button
                                      className="btn btn-square h-fit w-fit p-1 btn-error"
                                      onClick={() => deleteFn.address(addr.id)}
                                    >
                                      <TrashIcon className="w-6 h-6" />
                                    </button>
                                  </div>
                                </div>
                              </DragAndDrop.Item>
                            ))}
                        </DragAndDrop.DropZone>
                      </div>
                      {i < priorityAddress.levels.length - 1 && (
                        <Divider direction="horizontal" color="accent" />
                      )}
                    </div>
                  ))}
                </DragAndDrop>
              </Collapse.Content>
            </Collapse>
          </div>
        </div>
      </div>
      <addAddress.Component />
      <editAddress.Component />
      <addDictionary.Component />
      <editDictionary.Component />
    </>
  );
}
