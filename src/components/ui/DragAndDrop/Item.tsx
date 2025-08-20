import { useState } from 'react';

import { cn } from '@/utils/cn';

export type Props = {
  children: React.ReactNode;
  itemId: string;
  className?: string;
  onDragStart?: (itemId: string) => void;
  onDragEnd?: (itemId: string) => void;
  animation?: {
    dragging: string;
    notDragging: string;
    common: string;
  };
};

const Item: React.FC<Props> = ({
  children,
  itemId,
  className = '',
  onDragStart,
  onDragEnd,
  animation = {
    dragging: 'opacity-50 cursor-grabbing',
    notDragging: 'cursor-grab',
    common: 'transition-opacity duration-200 ease-in-out',
  },
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('text/plain', itemId);
    event.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
    onDragStart?.(itemId);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd?.(itemId);
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        isDragging ? animation.dragging : animation.notDragging,
        animation.common,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Item;
