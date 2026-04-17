'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  categoryLabel: string;
}

export function ProgressBar({ current, total, categoryLabel }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="px-5 pt-4 pb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-[#042132]">{categoryLabel}</span>
        <span className="text-xs font-semibold text-[#8FA3B8] tabular-nums">{current}/{total}</span>
      </div>
      <div className="w-full h-2 bg-[#EEF0F3] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: '#48DE82' }}
        />
      </div>
    </div>
  );
}
