import { useState } from 'react';

interface NicknameSetupProps {
  onConfirm: (nickname: string) => void;
}

export function NicknameSetup({ onConfirm }: NicknameSetupProps) {
  const [nickname, setNickname] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (nickname.trim()) {
      setConfirmed(true);
      // 延长显示时间到 2 秒，让用户看清楚
      setTimeout(() => {
        onConfirm(nickname.trim());
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && nickname.trim()) {
      handleConfirm();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {!confirmed ? (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              OI 之神要叫什么呢
            </h1>
            <div className="flex items-center justify-center gap-4">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入你的昵称"
                className="px-6 py-3 text-xl text-white bg-gray-900 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                autoFocus
                maxLength={20}
              />
              <button
                onClick={handleConfirm}
                disabled={!nickname.trim()}
                className="px-8 py-3 text-xl font-semibold text-white bg-green-600 rounded-xl hover:bg-green-700 hover:border-2 hover:border-green-300 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:transform-none disabled:hover:shadow-lg"
              >
                确认
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-4xl md:text-5xl font-bold text-white animate-pulse">
            好的，「{nickname}」
          </h1>
        )}
      </div>
    </div>
  );
}
