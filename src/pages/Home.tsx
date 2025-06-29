import { useState } from 'react';

const Home: React.FC = () => {
  const [likes, setLikes] = useState(0);
  const [message, setMessage] = useState('');

  const features = [
    {
      icon: '🚀',
      title: '高速開発',
      description: 'ViteとReactで爆速開発体験！',
    },
    {
      icon: '🎨',
      title: 'モダンUI',
      description: 'TailwindCSSで美しいデザイン',
    },
    {
      icon: '⚡',
      title: '高性能',
      description: 'TypeScriptで型安全な開発',
    },
    {
      icon: '🌟',
      title: 'ルーティング',
      description: 'TanStack Routerで快適なナビゲーション',
    },
  ];

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    const messages = [
      'やったね！✨',
      'ありがとう〜💕',
      '最高！🎉',
      'めっちゃ嬉しい〜😊',
      'もっと押して〜！💖',
    ];
    setMessage(messages[Math.floor(Math.random() * messages.length)]);

    // メッセージを3秒後にクリア
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-8">
        {/* 機能カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* インタラクティブセクション */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            いいねボタン押してみて〜！
          </h2>

          <button
            onClick={handleLike}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            💖 いいね！ ({likes})
          </button>

          {message && (
            <div className="mt-6 text-2xl font-bold text-yellow-300 animate-bounce">
              {message}
            </div>
          )}
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-white/80">TypeScript</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white">⚡</div>
            <div className="text-white/80">Vite Powered</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white">🎨</div>
            <div className="text-white/80">Tailwind CSS</div>
          </div>
        </div>

        {/* コールトゥアクション */}
        <div className="text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              さあ、始めよう！
            </h2>
            <p className="text-white/90 mb-6">
              このテンプレートを使って、あなたの素晴らしいアイデアを形にしよう✨
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                📚 ドキュメント
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                🚀 始める
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
