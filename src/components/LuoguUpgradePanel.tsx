import { useState } from 'react';
import type { AbilityInfo } from '../types/ability';

type TabType = 'info' | 'upgrade';

interface LuoguUpgradePanelProps {
  abilities: AbilityInfo;
  onClose: () => void;
  onUnlockLevel?: (level: number) => void; // 解锁等级
  currentUnlockedLevel?: number; // 当前已解锁的最高等级
  selectedLevel?: number; // 当前选择的刷题等级
  problemCount?: number; // 刷题计数
}

export function LuoguUpgradePanel({ abilities, onClose, onUnlockLevel, currentUnlockedLevel = 1, selectedLevel = 1, problemCount = 0 }: LuoguUpgradePanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('info');
  // 计算总能力值
  const totalAbility = 
    abilities.dataStructure +
    abilities.graphTheory +
    abilities.string +
    abilities.math +
    abilities.dp +
    abilities.coding +
    abilities.thinking;

  // 七个难度等级（提高了解锁条件）
  const levels = [
    { 
      level: 1, 
      title: '刷红题', 
      color: 'bg-red-500', 
      requirement: 0, 
      points: 1,
      description: '初始默认解锁'
    },
    { 
      level: 2, 
      title: '刷橙题', 
      color: 'bg-orange-500', 
      requirement: 100, 
      points: 3,
      description: '能力值总计 ≥ 100 解锁'
    },
    { 
      level: 3, 
      title: '刷黄题', 
      color: 'bg-yellow-500', 
      requirement: 300, 
      points: 10,
      description: '能力值总计 ≥ 300 解锁'
    },
    { 
      level: 4, 
      title: '刷绿题', 
      color: 'bg-green-500', 
      requirement: 800, 
      points: 40,
      description: '能力值总计 ≥ 800 解锁'
    },
    { 
      level: 5, 
      title: '刷蓝题', 
      color: 'bg-blue-500', 
      requirement: 1500, 
      points: 80,
      description: '能力值总计 ≥ 1500 解锁'
    },
    { 
      level: 6, 
      title: '刷紫题', 
      color: 'bg-purple-500', 
      requirement: 2500, 
      points: 120,
      description: '能力值总计 ≥ 2500 解锁'
    },
    { 
      level: 7, 
      title: '刷黑题', 
      color: 'bg-gray-900 border-2 border-gray-600', 
      requirement: 4000, 
      points: 200,
      description: '能力值总计 ≥ 4000 解锁'
    },
  ];

  return (
    <div className="fixed top-0 right-0 w-full md:w-1/3 h-full bg-gray-900 border-l-2 border-gray-700 shadow-2xl transform transition-transform duration-300 ease-in-out z-50">
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
        
        {/* 标题 */}
        <h2 className="text-2xl font-bold text-white mb-2">
          洛谷
        </h2>
        
        <p className="text-base text-gray-400 italic mb-6">
          计算机科学教育新生态
        </p>

        {/* 标签卡导航 */}
        <div className="flex gap-2 mb-6 w-full">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'info'
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            📊 信息
          </button>
          <button
            onClick={() => setActiveTab('upgrade')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'upgrade'
                ? 'bg-green-500 text-white shadow-lg scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            ⬆️ 升级
          </button>
        </div>

        {/* 信息页 */}
        {activeTab === 'info' && (
          <div className="w-full space-y-4">
            {/* 总能力值卡片 */}
            <div className="p-4 mb-3">
              <p className="text-xs text-gray-400 mb-1">当前能力值总计</p>
              <p className="text-2xl font-bold text-white">{totalAbility}</p>
            </div>

            {/* 当前刷题等级卡片 */}
            <div className="p-4 mb-3">
              <p className="text-xs text-gray-400 mb-1">当前在刷</p>
              <p className="text-lg font-bold text-white">{levels[selectedLevel - 1]?.title || '刷红题'}</p>
            </div>

            {/* 刷题计数卡片 */}
            <div className="p-4 mb-3">
              <p className="text-xs text-gray-400 mb-1">已刷题目数</p>
              <p className="text-2xl font-bold text-white">{problemCount}</p>
            </div>
          </div>
        )}

        {/* 升级页 */}
        {activeTab === 'upgrade' && (
          <div className="w-full space-y-3">
          {levels.map(({ level, title, color, requirement, points, description }) => {
            const isUnlocked = level <= currentUnlockedLevel; // 只有已解锁的等级才能点击
            const canUnlock = !isUnlocked && totalAbility >= requirement && level === currentUnlockedLevel + 1; // 可以解锁下一个等级
            
            return (
              <div
                key={title}
                className={`p-4 rounded-lg transition-all duration-200 ${
                  isUnlocked 
                    ? `${color} cursor-pointer hover:shadow-lg hover:scale-105` 
                    : canUnlock
                      ? 'bg-gray-600 cursor-pointer hover:bg-gray-500 hover:shadow-lg'
                      : 'bg-gray-700 opacity-50 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (isUnlocked && onUnlockLevel) {
                    // 已解锁的等级，点击后作为当前刷题等级
                    onUnlockLevel(level);
                  } else if (canUnlock && onUnlockLevel) {
                    // 满足条件，解锁新等级
                    onUnlockLevel(level);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  {isUnlocked ? (
                    <span className="text-xs px-2 py-1 bg-white/20 rounded text-white">
                      已解锁
                    </span>
                  ) : canUnlock ? (
                    <span className="text-xs px-2 py-1 bg-green-600 rounded text-white animate-pulse">
                      点击解锁！
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-gray-600 rounded text-gray-300">
                      未解锁
                    </span>
                  )}
                </div>
                <p className="text-sm text-white/90 mb-1">{description}</p>
                <p className="text-sm text-white/70">
                  解锁后左键点击随机提升七大能力（总计 +{points}）
                </p>
              </div>
            );
          })}
          </div>
        )}
      </div>
    </div>
  );
}
