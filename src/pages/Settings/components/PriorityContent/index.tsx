import { useState } from 'react';
import DragAndDrop from '../../../../components/ui/DragAndDrop';
import PriorityItem from '../PriorityItem';
import Divider from '../../../../components/layout/Divider';
import Modal from '../../../../components/ui/Modal';
import PriorityForm from '../PriorityForm';
import { useModal } from '../../../../hooks/useModal';

type Content = {
  id: string;
  content: string;
  level: number;
};

type Props = {
  contentName: string;
  contentType: 'word' | 'address';
  initialContents: Content[];
};

const PriorityContent: React.FC<Props> = ({
  contentName,
  contentType,
  initialContents = [],
}) => {
  const [contents, setContents] = useState<Content[]>(initialContents);
  const [editContent, setEditContent] = useState<Content | null>(null);

  const modalIds = {
    add: `add-${contentType}-modal`,
    edit: `edit-${contentType}-modal`,
  };

  const { openModal: openAddModal, closeModal: closeAddModal } = useModal(
    modalIds.add
  );
  const { openModal: openEditModal, closeModal: closeEditModal } = useModal(
    modalIds.edit
  );

  const contentLevels = [
    ...new Set(contents.map((content) => content.level)),
  ].sort((a, b) => b - a);

  const handleDrop = (itemId: string, targetLevel: number) => {
    setContents(
      contents.map((content) =>
        content.id === itemId ? { ...content, level: targetLevel } : content
      )
    );
  };

  const handleDelete = (id: string) => {
    setContents(contents.filter((content) => content.id !== id));
  };

  const handleEdit = (id: string) => {
    const contentToEdit = contents.find((content) => content.id === id);
    if (contentToEdit) {
      setEditContent(contentToEdit);
      openEditModal();
    }
  };

  const handleAddContent = (content: string, level: number) => {
    const newContent: Content = {
      id: `content-${Date.now()}`,
      content,
      level,
    };
    setContents([...contents, newContent]);
    closeAddModal(); // フォーム送信後にモーダルを閉じる
  };

  const handleEditContent = (content: string, level: number) => {
    if (editContent) {
      setContents(
        contents.map((c) =>
          c.id === editContent.id ? { ...c, content, level } : c
        )
      );
      setEditContent(null);
      closeEditModal();
    }
  };

  return (
    <>
      <div className="mb-4">
        <button className="btn btn-primary" onClick={openAddModal}>
          + 新しい{contentName}を追加
        </button>
      </div>
      <DragAndDrop className="flex w-full flex-col gap-5">
        {contentLevels.map((level, i) => (
          <>
            <div key={level} className="flex w-full flex-col items-start gap-2">
              <h4 className="text-lg font-semibold">レベル {level}</h4>
              <DragAndDrop.DropZone
                className="flex w-full max-w-xl flex-col gap-5 rounded-lg border p-4"
                onDrop={(itemId: string) => handleDrop(itemId, level)}
              >
                {contents
                  .filter((content) => content.level === level)
                  .map((content) => (
                    <DragAndDrop.Item key={content.id} itemId={content.id}>
                      <PriorityItem
                        itemName={content.content}
                        itemId={content.id}
                        onClickDelete={handleDelete}
                        onClickEdit={handleEdit}
                        iconClassName="w-6 h-6"
                        className="w-full text-2xl"
                      />
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
      <Modal modalId={modalIds.add}>
        <PriorityForm
          title={`新しい${contentName}を追加`}
          label={contentName}
          contentType={contentType}
          mode="add"
          onSubmit={handleAddContent}
        />
      </Modal>
      <Modal modalId={modalIds.edit}>
        <PriorityForm
          title={`${contentName}を編集`}
          label={contentName}
          contentType={contentType}
          mode="edit"
          onSubmit={handleEditContent}
          placeholder={
            editContent
              ? { content: editContent.content, level: editContent.level }
              : undefined
          }
        />
      </Modal>
    </>
  );
};

export default PriorityContent;
