import type React from 'react';

import StatusBadge from '@/components/ui/StatusBadge';
import type { DateTime } from '@/types';

type Props = {
  receivedAt: DateTime;
  subject: string;
  senderAddress: string;
  isUnread: boolean;
};

const MessageOverview: React.FC<Props> = ({
  receivedAt,
  subject,
  senderAddress,
  isUnread,
}) => {
  return (
    <div className="flex flex-col gap-1 relative">
      {isUnread && (
        <div className="absolute -top-1 left-0">
          <StatusBadge color="primary" size="lg" />
        </div>
      )}
      <p className="text-end text-sm text-primary flex gap-1 justify-end">
        <span className="flex gap-[0.15rem]">
          <span>{receivedAt.year}</span>
          <span>-</span>
          <span>{receivedAt.month}</span>
          <span>-</span>
          <span>{receivedAt.day}</span>
        </span>
        <span className="flex gap-[0.15rem]">
          <span>{receivedAt.hour}</span>
          <span>:</span>
          <span>{receivedAt.minute}</span>
        </span>
      </p>
      <h4 className="text-start text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
        {subject}
      </h4>
      <p className="text-start text-sm text-primary">{senderAddress}</p>
    </div>
  );
};

export default MessageOverview;
