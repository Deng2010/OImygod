interface TimeDisplayProps {
  tick: number;
  timeRate: number;
}

export function TimeDisplay({ tick, timeRate }: TimeDisplayProps) {
  return (
    <div className="bg-gray-900 bg-opacity-80 rounded-lg p-3 border border-gray-700">
      <div className="flex items-center gap-4 text-sm">
        <div className="text-white">
          <span className="text-gray-400">时间：</span>
          <span className="font-semibold">{tick}</span>
          <span className="text-gray-400 ml-1">tick</span>
        </div>
        <div className="text-white">
          <span className="text-gray-400">速率：</span>
          <span className="font-semibold">{timeRate.toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
}
