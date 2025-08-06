import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { cn } from '../../../../utils/cn';

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
    <div className={cn('flex justify-between items-center', className)}>
      <span>{itemName}</span>
      <div className="flex gap-2 h-full">
        <button
          className="btn btn-info btn-square w-fit h-fit p-1"
          onClick={() => onClickEdit(itemId)}
        >
          <PencilIcon className={iconClassName} />
        </button>
        <button
          className="btn btn-error btn-square w-fit h-fit p-1"
          onClick={() => onClickDelete(itemId)}
        >
          <TrashIcon className={iconClassName} />
        </button>
      </div>
    </div>
  );
};

export default PriorityItem;
