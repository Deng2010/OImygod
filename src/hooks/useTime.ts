import { useState, useEffect } from 'react';

interface TimeInfo {
  tick: number;
  timeRate: number;
}

export function useTime() {
  const [time, setTime] = useState<TimeInfo>(() => {
    // 从 localStorage 读取时间信息
    const saved = localStorage.getItem('oimygod_time');
    return saved ? JSON.parse(saved) : { tick: 0, timeRate: 1.0 };
  });

  useEffect(() => {
    // 保存时间信息到 localStorage
    localStorage.setItem('oimygod_time', JSON.stringify(time));
  }, [time]);

  useEffect(() => {
    // 创建定时器，根据时间速率更新 tick
    const interval = setInterval(() => {
      setTime(prevTime => ({
        ...prevTime,
        tick: prevTime.tick + 1
      }));
    }, 1000 / time.timeRate); // 根据速率调整更新时间间隔

    return () => clearInterval(interval);
  }, [time.timeRate]);

  const setTimeRate = (rate: number) => {
    if (rate > 0) {
      setTime(prevTime => ({
        ...prevTime,
        timeRate: rate
      }));
    }
  };

  return {
    time,
    setTimeRate,
  };
}
