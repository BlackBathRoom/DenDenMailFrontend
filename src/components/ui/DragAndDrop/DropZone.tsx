import { useState } from 'react';
import { cn } from '../../../utils/cn';

export type Props = {
  children: React.ReactNode;
  onDrop: (itemId: string) => void;
  className?: string;
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
    dragCounter.current += 1;
    setIsDragOver(true);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    dragCounter.current = 0;
    setIsDragOver(false);
    const itemId = event.dataTransfer.getData('text/plain');
    if (itemId) {
      onDrop(itemId);
    }
  };

  return (
    <div
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
