import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type Props = {
  children: ReactNode;
  className?: string;
  role: 'title' | 'content';
};

const Item: React.FC<Props> = ({ children, className = '', role }) => {
  return (
    <div
      className={cn(
        role === 'title' ? 'collapse-title' : 'collapse-content',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Item;
