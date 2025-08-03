import Header from '../../ui/Header';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col px-7 py-5">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
