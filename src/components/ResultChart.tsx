'use client';

import { CategoryScore, SoundChangeCategory } from '../data/types';

interface ResultChartProps {
  scores: Record<SoundChangeCategory, CategoryScore>;
}

const config: { key: SoundChangeCategory; label: string; sub: string; color: string }[] = [
  { key: 'linking', label: '連結', sub: '音がくっつく', color: '#0483F0' },
  { key: 'elision', label: '脱落', sub: '音が消える', color: '#F0844C' },
  { key: 'weakForm', label: '弱形', sub: '音が弱くなる', color: '#8B5CF6' },
];

export function ResultChart({ scores }: ResultChartProps) {
  return (
    <div className="space-y-4">
      {config.map(({ key, label, sub, color }) => {
        const s = scores[key];
        const pct = s.total > 0 ? (s.correct / s.total) * 100 : 0;

        return (
          <div key={key}>
            <div className="flex justify-between items-baseline mb-2">
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-[15px]">{label}</span>
                <span className="text-[11px] font-semibold text-[#8FA3B8]">{sub}</span>
              </div>
              <span className="text-xl font-extrabold tabular-nums" style={{ color }}>
                {s.correct}<span className="text-sm font-semibold text-[#8FA3B8]">/{s.total}</span>
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#EEF0F3] rounded-full overflow-hidden">
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
