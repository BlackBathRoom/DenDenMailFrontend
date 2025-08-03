import clsx from 'clsx';
import { useTheme } from '../../../hooks/useTheme';

const Header: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <div
      className={clsx(
        'w-full h-fit rounded-md px-13 py-4',
        'bg-base-300/60 shadow-2xl backdrop-filter backdrop-blur-lg border border-base-300/70',
        'dark:shadow-amber-900/20'
      )}
    >
      <div className="flex items-center gap-9">
        <span className="text-3xl">ホーム</span>
        <span className="text-3xl">設定</span>
        {/* only development */}
        <button className="btn btn-ghost btn-sm" onClick={toggleTheme}>
          <span className="material-symbols-outlined">toggle_theme</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
