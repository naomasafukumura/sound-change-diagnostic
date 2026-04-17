'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  categoryLabel: string;
}

const categoryColors: Record<string, string> = {
  '連結（くっつく）': '#3b82f6',
  '脱落（消える）': '#f97316',
  '弱形（弱くなる）': '#8b5cf6',
};

export function ProgressBar({ current, total, categoryLabel }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);
  const color = categoryColors[categoryLabel] || '#3b82f6';

  return (
    <div className="px-5 pt-4 pb-2">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-bold" style={{ color }}>{categoryLabel}</span>
        <span className="text-xs text-[#94a3b8] tabular-nums">{current}/{total}</span>
      </div>
      <div className="w-full h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
