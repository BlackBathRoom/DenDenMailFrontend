import { Link } from '@tanstack/react-router';
import { useTheme } from '../../../hooks/useTheme';
import Panel from '../Panel';

const Header: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <Panel className="w-full h-fit px-13 py-4">
      <div className="flex items-center gap-9">
        <Link to="/" className="text-3xl">
          ホーム
        </Link>
        <Link to="/settings" className="text-3xl">
          設定
        </Link>
        {/* only development */}
        <button className="btn btn-ghost btn-sm" onClick={toggleTheme}>
          <span className="material-symbols-outlined">toggle_theme</span>
        </button>
      </div>
    </Panel>
  );
};

export default Header;
