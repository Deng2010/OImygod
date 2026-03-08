import { useState, useEffect } from 'react';
import { usePlayer } from '../hooks/usePlayer';
import { useTime } from '../hooks/useTime';
import { useLuogu } from '../hooks/useLuogu';
import { GameButton } from './GameButton';
import { PlayerInfoPanel } from './PlayerInfoPanel';
import { TimeDisplay } from './TimeDisplay';
import { LuoguButton } from './LuoguButton';
import { LuoguUpgradePanel } from './LuoguUpgradePanel';

interface GameScreenProps {
  onBack?: () => void;
}

export function GameScreen({ onBack }: GameScreenProps) {
  const { player, updateAbility } = usePlayer();
  const { time } = useTime();
  const luogu = useLuogu(time.tick, updateAbility, player.abilities);
  const [showPlayerInfo, setShowPlayerInfo] = useState(false);
  const [showLuoguPanel, setShowLuoguPanel] = useState(false);
  
  // 从 localStorage 读取已解锁等级和选择的等级
  const [currentUnlockedLevel, setCurrentUnlockedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('oimygod_luogu_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.currentUnlockedLevel || 1;
      }
    } catch (e) {
      console.error('Failed to load luogu progress:', e);
    }
    return 1;
  }); // 当前已解锁的最高等级
  
  const [selectedLevel, setSelectedLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('oimygod_luogu_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.selectedLevel || 1;
      }
    } catch (e) {
      console.error('Failed to load luogu progress:', e);
    }
    return 1;
  }); // 当前选择的刷题等级
  
  const [luoguButtonVisible, setLuoguButtonVisible] = useState(false); // 洛谷按钮是否可见

  // 保存已解锁等级和选择的等级到 localStorage
  useEffect(() => {
    try {
      localStorage.setItem('oimygod_luogu_progress', JSON.stringify({
        currentUnlockedLevel,
        selectedLevel,
      }));
    } catch (e) {
      console.error('Failed to save luogu progress:', e);
    }
  }, [currentUnlockedLevel, selectedLevel]);

  // 监听 tick 变化，控制洛谷按钮的可见性和可点击性
  useEffect(() => {
    if (time.tick >= 3 && !luoguButtonVisible) {
      setLuoguButtonVisible(true);
    }
  }, [time.tick, luoguButtonVisible]);

  // 根据能力值自动检查是否可以解锁新等级
  useEffect(() => {
    const totalAbility = 
      player.abilities.dataStructure +
      player.abilities.graphTheory +
      player.abilities.string +
      player.abilities.math +
      player.abilities.dp +
      player.abilities.coding +
      player.abilities.thinking;
    
    // 各等级的解锁条件
    const levelRequirements: number[] = [0, 100, 300, 800, 1500, 2500, 4000];
    
    // 检查是否可以解锁下一个等级
    for (let level = currentUnlockedLevel + 1; level <= 7; level++) {
      const requirement = levelRequirements[level - 1];
      if (requirement !== undefined && totalAbility >= requirement) {
        setCurrentUnlockedLevel(level);
        // 如果是第一次解锁这个等级，自动选择它
        if (selectedLevel < level) {
          setSelectedLevel(level);
        }
        break;
      }
    }
  }, [player.abilities, currentUnlockedLevel, selectedLevel]);

  // 打开玩家信息面板（自动关闭洛谷面板）
  const openPlayerInfo = () => {
    setShowLuoguPanel(false);
    setShowPlayerInfo(true);
  };

  // 打开洛谷面板（自动关闭玩家信息面板）
  const openLuoguPanel = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setShowPlayerInfo(false);
    setShowLuoguPanel(true);
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* 顶部栏：返回按钮、时间显示、设置按钮 */}
      <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-6">
        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="p-3 text-gray-400 hover:text-white transition-colors"
          title="返回"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* 时间显示 */}
        <TimeDisplay tick={time.tick} timeRate={time.timeRate} />

        {/* 设置按钮 */}
        <button
          className="p-3 text-gray-400 hover:text-white transition-colors"
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
      </div>

      {/* 主内容区域 */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* 游戏按钮区域 */}
        <div className="flex flex-col items-center gap-8">
          {/* 主按钮 - 编程相关 emoji，点击显示玩家信息 */}
          <GameButton 
            emoji="💻" 
            color="white" 
            onClick={openPlayerInfo}
            onRightClick={openPlayerInfo}
          />
          
          {/* 白色连接线 - 连接两个按钮（仅在洛谷按钮可见时显示） */}
          <div className={`w-1 h-16 bg-white rounded-full transition-opacity duration-300 ${luoguButtonVisible ? 'opacity-100' : 'opacity-0'}`}></div>
          
          {/* 洛谷按钮（仅在 tick>=3 时可见并可点击） */}
          <div className={`transition-all duration-300 ${luoguButtonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <LuoguButton
              canClick={luogu.canClick}
              onLeftClick={() => {
              if (luogu.canClick) {
                const ability = luogu.handleLeftClick(selectedLevel); // 传入当前选择的等级
                if (ability) {
                  console.log(`提升了 ${ability} 能力（等级 ${selectedLevel}）`);
                }
              }
            }}
            onRightClick={(e) => {
              luogu.handleRightClick(e);
              openLuoguPanel(e); // 使用新的函数
            }}
          />
          </div>
          
          {/* 后续可以添加更多按钮 */}
          {/* <div className="flex gap-4 mt-4">
            <GameButton emoji="📚" color="blue" />
            <GameButton emoji="⚔️" color="red" />
            <GameButton emoji="🏆" color="yellow" />
          </div> */}
        </div>
      </div>

      {/* 玩家信息面板 */}
      {showPlayerInfo && (
        <PlayerInfoPanel
          onClose={() => setShowPlayerInfo(false)}
          abilities={player.abilities}
          nickname={player.nickname}
        />
      )}

      {/* 洛谷升级面板 */}
      {showLuoguPanel && (
        <LuoguUpgradePanel
          abilities={luogu.abilities}
          onClose={() => setShowLuoguPanel(false)}
          currentUnlockedLevel={currentUnlockedLevel}
          selectedLevel={selectedLevel}
          problemCount={luogu.problemCount} // 传递刷题计数
          onUnlockLevel={(level) => {
            // 解锁新等级或选择已解锁的等级
            if (level > currentUnlockedLevel) {
              // 解锁新等级
              setCurrentUnlockedLevel(level);
              setSelectedLevel(level); // 自动选择新解锁的等级
              console.log(`解锁了新等级：${level}`);
            } else {
              // 选择已解锁的等级
              setSelectedLevel(level);
              console.log(`选择了等级 ${level} 作为刷题等级`);
            }
          }}
        />
      )}
    </div>
  );
}
