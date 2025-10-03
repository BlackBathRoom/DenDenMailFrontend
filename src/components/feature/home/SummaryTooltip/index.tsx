import type React from 'react';
import { useQuery } from '@tanstack/react-query';

import Loading from '@/components/ui/Loading';
import Tooltip from '@/components/ui/Tooltip';
import { getSummaryOptions } from '@/api/routers/summary';

type Props = {
  children: React.ReactNode;
  message_id: number;
  isDisplayBottom?: boolean;
};

const SummaryTooltip: React.FC<Props> = ({
  children,
  message_id,
  isDisplayBottom,
}) => {
  const { data, isPending, isError } = useQuery(getSummaryOptions(message_id));

  if (isError) return children;

  return isPending ? (
    <div className="tooltip tooltip-accent">
      <div className="tooltip-content">
        <Loading size="sm" variety="spinner" color="secondary" />
      </div>
      {children}
    </div>
  ) : data ? (
    <Tooltip
      content={data.content}
      position={isDisplayBottom ? 'bottom' : 'top'}
      color="accent"
    >
      {children}
    </Tooltip>
  ) : (
    children
  );
};

export default SummaryTooltip;
