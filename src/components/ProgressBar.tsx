'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  categoryLabel: string;
}

export function ProgressBar({ current, total, categoryLabel }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="px-5 pt-5 pb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-500">{categoryLabel}</span>
        <span className="text-sm text-slate-500">
          {current} / {total}
        </span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
