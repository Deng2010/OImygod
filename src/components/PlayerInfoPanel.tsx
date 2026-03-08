import type { AbilityInfo } from '../types/ability';

interface PlayerInfoPanelProps {
  onClose: () => void;
  abilities: AbilityInfo;
  nickname?: string | null;
}

export function PlayerInfoPanel({ onClose, abilities, nickname }: PlayerInfoPanelProps) {

  return (
    <div className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-gray-900 border-l-2 border-gray-700 shadow-2xl transform transition-transform duration-300 ease-in-out">
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
        title="关闭"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* 内容区域 */}
      <div className="flex flex-col items-start h-full p-8 bg-gray-800 overflow-y-auto">
        {/* 关闭按钮占位，避免被遮挡 */}
        <div className="w-full h-12"></div>
        
        {/* 玩家昵称 */}
        <h2 className="text-2xl font-bold text-white mb-2">
          {nickname || 'heaa'}
        </h2>
        
        {/* 称号 */}
        <p className="text-base text-gray-400 italic mb-6">
          OI 之神
        </p>

        {/* 信息卡片 */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <span className="text-sm text-gray-300">数据结构能力</span>
            </div>
            <p className="text-xl font-semibold text-white">{abilities.dataStructure}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🕸️</span>
              <span className="text-sm text-gray-300">图论能力</span>
            </div>
            <p className="text-xl font-semibold text-white">{abilities.graphTheory}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔤</span>
              <span className="text-sm text-gray-300">字符串能力</span>
            </div>
            <p className="text-xl font-semibold text-white">{abilities.string}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔢</span>
              <span className="text-sm text-gray-300">数学能力</span>
            </div>
            <p className="text-xl font-semibold text-white">{abilities.math}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔄</span>
              <span className="text-sm text-gray-300">动态规划能力</span>
            </div>
            <p className="text-xl font-semibold text-white">{abilities.dp}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">💻</span>
              <span className="text-sm text-gray-300">代码能力</span>
            </div>
            <p className="text-xl font-semibold text-white">{abilities.coding}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🧠</span>
              <span className="text-sm text-gray-300">思维能力</span>
            </div>
            <p className="text-xl font-semibold text-white">{abilities.thinking}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
