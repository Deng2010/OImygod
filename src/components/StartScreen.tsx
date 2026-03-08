import { usePlayer } from '../hooks/usePlayer';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const { player } = usePlayer();

  return (
    <div className="min-h-screen bg-black relative">
      {/* 设置按钮 - 右上角 */}
      <button
        className="absolute top-6 right-6 p-3 text-gray-400 hover:text-white transition-colors"
        title="设置"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* 主内容区域 */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
          来成为 OI 之神
        </h1>
        <p className="text-3xl text-white/80 mb-12">
          欢迎你，「{player.nickname}」！
        </p>
        
        {/* 开始按钮 */}
        <button
          onClick={onStart}
          className="px-12 py-4 text-2xl font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 hover:border-2 hover:border-green-300 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
        >
          开始
        </button>
      </div>
    </div>
  );
}
