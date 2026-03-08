import { useState, useEffect } from 'react';
import type { AbilityInfo } from '../types/ability';

interface LuoguState {
  lastClickTick: number | null;
  problemCount: number; // 刷题计数
}

const COOLDOWN_TICKS = 3; // 每 3 tick 可点击一次

export function useLuogu(currentTick: number, updateAbility?: (abilityKey: keyof AbilityInfo, value: number) => void, currentAbilities?: AbilityInfo) {
  const [luoguState, setLuoguState] = useState<LuoguState>(() => {
    try {
      const saved = localStorage.getItem('oimygod_luogu');
      if (saved) {
        const parsed = JSON.parse(saved);
        // 验证数据结构是否正确
        if (typeof parsed.lastClickTick !== 'undefined') {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load luogu state:', e);
    }
    return {
      lastClickTick: null,
      problemCount: 0,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('oimygod_luogu', JSON.stringify(luoguState));
    } catch (e) {
      console.error('Failed to save luogu state:', e);
    }
  }, [luoguState]);

  // 检查是否可以点击（距离上次点击已经过了 15 tick）
  // 游戏开始时 (tick=0,1,2) 不可点击，从 tick=3 开始可以点击
  const canClick = currentTick < 3 ? false : (luoguState.lastClickTick === null || 
                   (currentTick - luoguState.lastClickTick >= COOLDOWN_TICKS));

  // 左键点击：提升随机能力（根据等级决定提升点数）
  const handleLeftClick = (level: number = 1) => {
    if (!canClick || !updateAbility || !currentAbilities) return;

    // 根据等级决定每次提升的点数
    const pointsMap: Record<number, number> = {
      1: 1,   // 红题
      2: 3,   // 橙题
      3: 10,  // 黄题
      4: 40,  // 绿题
      5: 80,  // 蓝题
      6: 120, // 紫题
      7: 200, // 黑题
    };
    
    const points = pointsMap[level] || 1; // 默认 1 点

    const abilityKeys: Array<keyof AbilityInfo> = ['dataStructure', 'graphTheory', 'string', 'math', 'dp', 'coding', 'thinking'];
    const randomIndex = Math.floor(Math.random() * abilityKeys.length);
    const randomAbility = abilityKeys[randomIndex];

    // 更新能力值到 usePlayer
    let newValue = 0;
    switch (randomAbility) {
      case 'dataStructure': 
        newValue = currentAbilities.dataStructure + points;
        break;
      case 'graphTheory': 
        newValue = currentAbilities.graphTheory + points;
        break;
      case 'string': 
        newValue = currentAbilities.string + points;
        break;
      case 'math': 
        newValue = currentAbilities.math + points;
        break;
      case 'dp': 
        newValue = currentAbilities.dp + points;
        break;
      case 'coding': 
        newValue = currentAbilities.coding + points;
        break;
      case 'thinking': 
        newValue = currentAbilities.thinking + points;
        break;
    }
    updateAbility(randomAbility as keyof AbilityInfo, newValue);

    setLuoguState(prev => ({
      ...prev,
      lastClickTick: currentTick,
      problemCount: prev.problemCount + 1, // 每次点击增加刷题数
    }));

    return randomAbility;
  };

  // 右键点击：打开升级面板
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // 返回当前能力值，用于显示在面板中
    return currentAbilities;
  };

  // 获取能力值
  const getAbilities = () => currentAbilities;

  // 更新单个能力值
  const upgradeAbility = (abilityKey: keyof AbilityInfo, value: number) => {
    if (updateAbility) {
      updateAbility(abilityKey, value);
    }
  };

  return {
    canClick,
    handleLeftClick,
    handleRightClick,
    abilities: currentAbilities || {
      dataStructure: 10,
      graphTheory: 10,
      string: 10,
      math: 10,
      dp: 10,
      coding: 10,
      thinking: 10,
    },
    upgradeAbility,
    lastClickTick: luoguState.lastClickTick,
    problemCount: luoguState.problemCount ?? 0, // 返回刷题计数，如果未定义则为 0
    currentTick,
  };
}
