interface LuoguButtonProps {
  canClick: boolean;
  onLeftClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

export function LuoguButton({ canClick, onLeftClick, onRightClick }: LuoguButtonProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.button === 0) { // 左键
      onLeftClick();
    } else if (e.button === 2) { // 右键
      onRightClick(e);
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
      className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl 
                 border-4 border-transparent hover:border-current transition-all duration-200
                 shadow-lg hover:shadow-xl transform hover:scale-105
                 ${canClick ? 'bg-green-500 hover:border-green-300' : 'bg-red-500 hover:border-red-300'}`}
      title={canClick ? "洛谷 (左键点击提升能力，右键打开面板)" : "冷却中..."}
    >
      <span className="text-xl font-bold text-white">AC</span>
    </button>
  );
}
