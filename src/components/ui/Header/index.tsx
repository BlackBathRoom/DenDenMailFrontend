import { Link } from '@tanstack/react-router';

import Panel from '@/components/ui/Panel';

const Header: React.FC = () => {
  return (
    <Panel className="h-fit w-full px-13 py-4">
      <div className="flex items-center gap-9">
        <Link to="/" className="text-3xl">
          ホーム
        </Link>
        <Link to="/search" className="text-3xl">
          検索
        </Link>
        <Link to="/settings" className="text-3xl">
          設定
        </Link>
      </div>
    </Panel>
  );
};

export default Header;
