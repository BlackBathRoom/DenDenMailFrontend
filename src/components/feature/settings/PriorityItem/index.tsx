import { PencilIcon, TrashIcon } from 'lucide-react';

import { cn } from '@/utils/cn';

type Props<T extends string | number> = {
  itemName: string;
  itemId: T;
  onClickDelete: (itemId: T) => void;
  onClickEdit: (itemId: T) => void;
  iconClassName?: string;
  className?: string;
};

const PriorityItem = <T extends string | number>({
  itemName,
  itemId,
  onClickDelete,
  onClickEdit,
  iconClassName = 'w-10 h-10',
  className,
}: Props<T>) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <span>{itemName}</span>
      <div className="flex h-full gap-2">
        <button
          className="btn btn-square h-fit w-fit p-1 btn-info"
          onClick={() => onClickEdit(itemId)}
        >
          <PencilIcon className={iconClassName} />
        </button>
        <button
          className="btn btn-square h-fit w-fit p-1 btn-error"
          onClick={() => onClickDelete(itemId)}
        >
          <TrashIcon className={iconClassName} />
        </button>
      </div>
    </div>
  );
};

export default PriorityItem;
