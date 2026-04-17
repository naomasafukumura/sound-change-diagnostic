'use client';

import { CategoryScore, SoundChangeCategory } from '../data/types';

interface ResultChartProps {
  scores: Record<SoundChangeCategory, CategoryScore>;
}

const config: { key: SoundChangeCategory; label: string; color: string }[] = [
  { key: 'linking', label: '連結', color: '#3b82f6' },
  { key: 'elision', label: '脱落', color: '#f97316' },
  { key: 'weakForm', label: '弱形', color: '#8b5cf6' },
];

export function ResultChart({ scores }: ResultChartProps) {
  return (
    <div className="space-y-4">
      {config.map(({ key, label, color }) => {
        const s = scores[key];
        const pct = s.total > 0 ? (s.correct / s.total) * 100 : 0;

        return (
          <div key={key}>
            <div className="flex justify-between items-baseline mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="font-bold text-sm">{label}</span>
              </div>
              <span className="text-2xl font-black tabular-nums" style={{ color }}>
                {s.correct}<span className="text-sm font-medium text-[#94a3b8]">/{s.total}</span>
              </span>
            </div>
            <div className="w-full h-3 bg-[#f1f5f9] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
