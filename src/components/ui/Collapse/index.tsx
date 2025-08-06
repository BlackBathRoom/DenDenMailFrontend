import type { ReactElement } from 'react';
import { cn } from '../../../utils/cn';
import type { ClassMap } from '../../../types/component';
import type { Props as BaseItemProps } from './Item';
import Item from './Item';

type ItemProps = Omit<BaseItemProps, 'role'>;

const TitleItem: React.FC<ItemProps> = ({ children, className = '' }) =>
  Item({
    children,
    className,
    role: 'title',
  });

const ContentItem: React.FC<ItemProps> = ({ children, className = '' }) =>
  Item({
    children,
    className: className,
    role: 'content',
  });

type Icon = 'arrow' | 'plus';

const iconMap: ClassMap<Icon, 'collapse'> = {
  arrow: 'collapse-arrow',
  plus: 'collapse-plus',
};

type ForceState = 'open' | 'close';

const forceStateMap: ClassMap<ForceState, 'collapse'> = {
  open: 'collapse-open',
  close: 'collapse-close',
};

type Props = {
  children: ReactElement<ItemProps> | ReactElement<ItemProps>[];
  icon: Icon;
  name?: string;
  className?: string;
  forceState?: ForceState;
  defaultChecked?: boolean;
};

const Collapse: React.FC<Props> & {
  Title: typeof TitleItem;
  Content: typeof ContentItem;
} = ({
  children,
  icon = 'arrow',
  name = 'collapse',
  forceState,
  className = '',
  defaultChecked = false,
}) => {
  return (
    <div
      className={cn(
        'collapse w-full',
        iconMap[icon],
        forceState && forceStateMap[forceState],
        className
      )}
    >
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      {children}
    </div>
  );
};

Collapse.Title = TitleItem;
Collapse.Content = ContentItem;

export default Collapse;
