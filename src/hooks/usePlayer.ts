import { useState } from 'react';
import type { AbilityInfo } from '../types/ability';

interface PlayerInfo {
  nickname: string | null;
  abilities: AbilityInfo;
}

export function usePlayer() {
  const [player, setPlayer] = useState<PlayerInfo>(() => {
    // 从 localStorage 读取玩家信息
    const saved = localStorage.getItem('oimygod_player');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 验证数据结构并初始化能力值
        if (parsed.abilities) {
          return parsed;
        } else {
          // 如果是旧数据，添加默认能力值
          return {
            ...parsed,
            abilities: {
              dataStructure: 10,
              graphTheory: 10,
              string: 10,
              math: 10,
              dp: 10,
              coding: 10,
              thinking: 10,
            }
          };
        }
      } catch (e) {
        console.error('Failed to parse player data:', e);
      }
    }
    // 返回默认数据
    return {
      nickname: null,
      abilities: {
        dataStructure: 10,
        graphTheory: 10,
        string: 10,
        math: 10,
        dp: 10,
        coding: 10,
        thinking: 10,
      }
    };
  });

  const setNickname = (nickname: string) => {
    const newPlayer = { ...player, nickname };
    setPlayer(newPlayer);
    localStorage.setItem('oimygod_player', JSON.stringify(newPlayer));
  };

  const updateAbility = (abilityKey: keyof AbilityInfo, value: number) => {
    const newPlayer = {
      ...player,
      abilities: {
        ...player.abilities,
        [abilityKey]: value
      }
    };
    setPlayer(newPlayer);
    localStorage.setItem('oimygod_player', JSON.stringify(newPlayer));
  };

  return {
    player,
    setNickname,
    updateAbility,
    hasNickname: !!player.nickname,
  };
}
