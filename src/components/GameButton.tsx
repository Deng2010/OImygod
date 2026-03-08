interface GameButtonProps {
  emoji: string;
  label?: string;
  onClick?: () => void;
  onRightClick?: () => void;
  color?: 'white' | 'blue' | 'green' | 'red' | 'purple' | 'yellow';
}

export function GameButton({ emoji, label, onClick, onRightClick, color = 'white' }: GameButtonProps) {
  const colorClasses = {
    white: 'bg-white hover:border-gray-300',
    blue: 'bg-blue-500 hover:border-blue-300',
    green: 'bg-green-500 hover:border-green-300',
    red: 'bg-red-500 hover:border-red-300',
    purple: 'bg-purple-500 hover:border-purple-300',
    yellow: 'bg-yellow-500 hover:border-yellow-300',
  };

  return (
    <button
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault(); // 阻止默认右键菜单
        onRightClick?.(); // 调用右键点击处理函数
      }}
      className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl 
                 border-4 border-transparent hover:border-current transition-all duration-200
                 shadow-lg hover:shadow-xl transform hover:scale-105 ${colorClasses[color]}`}
    >
      {emoji}
    </button>
  );
}
