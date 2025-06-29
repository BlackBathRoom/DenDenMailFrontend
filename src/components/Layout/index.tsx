type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🌈 AI App Frontend 🌈
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            最新技術を使った超イケてるWebアプリのサンプルページだよ〜！
          </p>
        </header>
        <main>{children}</main>
        <footer className="text-center mt-12 text-white/70">
          <p>Made with 💖 by あなたの開発チーム</p>
          <p className="text-sm mt-2">
            React + TypeScript + Vite + TailwindCSS + TanStack Router
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
