import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';

export type Props = {
  children: React.ReactNode;
  onDrop: (itemId: string) => void;
  className?: string;
  isNested?: boolean;
  animation?: {
    enter: string;
    leave: string;
    common?: string;
  };
};

const DropZone: React.FC<Props> = ({
  children,
  onDrop,
  className = '',
  isNested = false,
  animation = {
    enter: 'border-2 border-blue-500 bg-blue-50',
    leave: 'border-2 border-gray-300 border-dashed',
    common: 'transition-colors duration-200 ease-in-out',
  },
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const dragCounter = useRef(0);

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // ゾーン内の子要素間移動でも dragenter は複数回発火するためカウントで管理
    dragCounter.current += 1;
    if (dragCounter.current === 1) {
      setIsDragOver(true);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // 子要素間の移動でも dragleave は発火するので対称にデクリメント
    dragCounter.current = Math.max(0, dragCounter.current - 1);
    if (dragCounter.current === 0) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current = 0;
    setIsDragOver(false);
    const itemId = event.dataTransfer.getData('text/plain');
    if (itemId) {
      onDrop(itemId);
    }
  };

  // ドラッグが画面外や他領域で終了/ドロップされた場合でも必ずリセットする
  useEffect(() => {
    const reset = () => {
      if (dragCounter.current !== 0 || isDragOver) {
        dragCounter.current = 0;
        setIsDragOver(false);
      }
    };
    window.addEventListener('dragend', reset);
    window.addEventListener('drop', reset);
    return () => {
      window.removeEventListener('dragend', reset);
      window.removeEventListener('drop', reset);
    };
  }, [isDragOver]);

  return (
    <div
      data-dropzone={isNested ? 'nested' : 'root'}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        isDragOver ? animation.enter : animation.leave,
        animation.common,
        className
      )}
    >
      {children}
    </div>
  );
};

export default DropZone;
