import { cn } from '@/utils/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Panel: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'rounded-md border border-base-300/70 bg-base-300/60 shadow-2xl backdrop-blur-lg backdrop-filter',
        'dark:shadow-amber-900/20',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
