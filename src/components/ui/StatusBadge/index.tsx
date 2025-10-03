import type React from 'react';

import type { ClassMap, Color, Size } from '@/types/component';

const colorMap: ClassMap<Color, 'status'> = {
  neutral: 'status-neutral',
  primary: 'status-primary',
  secondary: 'status-secondary',
  accent: 'status-accent',
  info: 'status-info',
  success: 'status-success',
  warning: 'status-warning',
  error: 'status-error',
} as const;

const sizeMap: ClassMap<Size, 'status'> = {
  xs: 'status-xs',
  sm: 'status-sm',
  md: 'status-md',
  lg: 'status-lg',
  xl: 'status-xl',
} as const;

type Props = {
  color?: Color;
  size?: Size;
};

const StatusBadge: React.FC<Props> = ({ color = 'neutral', size = 'md' }) => {
  return (
    <div
      aria-label="status"
      className={`status ${colorMap[color]} ${sizeMap[size]}`}
    />
  );
};

export default StatusBadge;
