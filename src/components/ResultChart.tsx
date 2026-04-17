'use client';

import { CategoryScore, SoundChangeCategory } from '../data/types';

interface ResultChartProps {
  scores: Record<SoundChangeCategory, CategoryScore>;
}

const labels: Record<SoundChangeCategory, string> = {
  linking: '連結',
  elision: '脱落',
  weakForm: '弱形',
};

export function ResultChart({ scores }: ResultChartProps) {
  const cats: SoundChangeCategory[] = ['linking', 'elision', 'weakForm'];
  const rates = cats.map((c) => {
    const s = scores[c];
    return s.total > 0 ? s.correct / s.total : 0;
  });

  const cx = 150;
  const cy = 140;
  const r = 100;
  const angles = cats.map((_, i) => (Math.PI * 2 * i) / cats.length - Math.PI / 2);

  const gridPoints = (scale: number) =>
    angles.map((a) => `${cx + r * scale * Math.cos(a)},${cy + r * scale * Math.sin(a)}`).join(' ');

  const dataPoints = angles
    .map((a, i) => `${cx + r * rates[i] * Math.cos(a)},${cy + r * rates[i] * Math.sin(a)}`)
    .join(' ');

  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 300 300" className="w-64 h-64">
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <polygon
            key={scale}
            points={gridPoints(scale)}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}
        {angles.map((a, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + r * Math.cos(a)}
            y2={cy + r * Math.sin(a)}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}
        <polygon points={dataPoints} fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
        {angles.map((a, i) => (
          <g key={i}>
            <circle cx={cx + r * rates[i] * Math.cos(a)} cy={cy + r * rates[i] * Math.sin(a)} r="4" fill="#3b82f6" />
            <text
              x={cx + (r + 20) * Math.cos(a)}
              y={cy + (r + 20) * Math.sin(a)}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-sm fill-slate-600"
              fontSize="14"
            >
              {labels[cats[i]]}
            </text>
            <text
              x={cx + (r + 38) * Math.cos(a)}
              y={cy + (r + 38) * Math.sin(a)}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-xs fill-slate-400"
              fontSize="12"
            >
              {scores[cats[i]].correct}/{scores[cats[i]].total}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
