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
        <span className="text-[12px] font-bold text-[#042132]">{categoryLabel}</span>
        <span className="text-[12px] font-semibold text-[#8494A7] tabular-nums">{current}/{total}</span>
      </div>
      <div className="w-full h-[6px] bg-[#E8ECF0] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #34D399 0%, #10B981 100%)' }}
        />
      </div>
    </div>
  );
}
