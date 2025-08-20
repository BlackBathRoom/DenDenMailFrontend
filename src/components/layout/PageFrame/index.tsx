import Header from '@/components/ui/Header';

type Props = {
  children: React.ReactNode;
};

const PageFrame: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-dvh max-h-dvh w-full flex-col gap-5 overflow-y-hidden px-7 py-5">
      <Header />
      <div className="w-full flex-1">{children}</div>
    </div>
  );
};

export default PageFrame;
