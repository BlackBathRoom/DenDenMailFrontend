import type { ClassMap, Color } from '@/types/component';
import { cn } from '@/utils/cn';

type Position = 'top' | 'right' | 'bottom' | 'left';

const positionMap: ClassMap<Position, 'tooltip'> = {
  top: 'tooltip-top',
  right: 'tooltip-right',
  bottom: 'tooltip-bottom',
  left: 'tooltip-left',
};

const colorMap: ClassMap<Color, 'tooltip'> = {
  neutral: 'tooltip-neutral',
  primary: 'tooltip-primary',
  secondary: 'tooltip-secondary',
  accent: 'tooltip-accent',
  info: 'tooltip-info',
  success: 'tooltip-success',
  warning: 'tooltip-warning',
  error: 'tooltip-error',
};

type Props = {
  children: React.ReactNode;
  content: string;
  position?: Position;
  color?: Color;
  isOpen?: boolean;
};

const Tooltip: React.FC<Props> = ({
  children,
  content,
  position = 'top',
  color = 'neutral',
  isOpen = false,
}) => {
  return (
    <div
      className={cn(
        'tooltip',
        positionMap[position],
        colorMap[color],
        isOpen && 'tooltip-open'
      )}
      data-tip={content}
    >
      {children}
    </div>
  );
};

export default Tooltip;
