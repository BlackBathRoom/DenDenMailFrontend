import Header from '../../ui/Header';

type Props = {
  children: React.ReactNode;
};

const PageFrame: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col gap-5 px-7 py-5 h-screen w-full">
      <Header />
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
};

export default PageFrame;
