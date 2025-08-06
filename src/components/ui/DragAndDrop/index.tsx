import type React from 'react';
import type { Props as DropZoneProps } from './DropZone';
import type { Props as ItemProps } from './Item';
import DropZone from './DropZone';
import Item from './Item';

type Props = {
  children:
    | React.ReactElement<ItemProps | DropZoneProps>
    | React.ReactElement<ItemProps | DropZoneProps>[];
  className?: string;
};

const DragAndDrop: React.FC<Props> & {
  Item: typeof Item;
  DropZone: typeof DropZone;
} = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

DragAndDrop.Item = Item;
DragAndDrop.DropZone = DropZone;

export default DragAndDrop;
