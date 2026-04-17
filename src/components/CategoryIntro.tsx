'use client';

import { CategoryIntro as CategoryIntroType } from '../data/types';
import { AudioPlayer } from './AudioPlayer';

interface CategoryIntroProps {
  category: CategoryIntroType;
  onNext: () => void;
}

const categoryConfig: Record<string, { color: string; gradient: string; num: number }> = {
  linking: { color: '#0483F0', gradient: 'linear-gradient(135deg, #E8F4FD 0%, #D0E8FA 100%)', num: 1 },
  elision: { color: '#F97316', gradient: 'linear-gradient(135deg, #FFF3E8 0%, #FFE4CC 100%)', num: 2 },
  weakForm: { color: '#8B5CF6', gradient: 'linear-gradient(135deg, #F3EEFF 0%, #E8DEFF 100%)', num: 3 },
};

export function CategoryIntroCard({ category, onNext }: CategoryIntroProps) {
  const config = categoryConfig[category.category] || { color: '#0483F0', gradient: '', num: 0 };

  return (
    <div className="animate-fade-in px-5 py-6">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: config.color, boxShadow: `0 4px 12px ${config.color}30` }}
        >
          <span className="text-white text-lg font-extrabold">{config.num}</span>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-[#042132]">{category.title}</h2>
          <p className="text-[#8494A7] text-[12px] font-semibold">{category.subtitle}</p>
        </div>
      </div>

      <p className="text-[14px] text-[#5A6B7D] leading-[1.7] mb-6">{category.description}</p>

      <div className="rounded-2xl overflow-hidden mb-8" style={{ background: config.gradient }}>
        <div className="px-4 py-3 border-b" style={{ borderColor: config.color + '15' }}>
          <p className="text-[11px] font-bold tracking-wider" style={{ color: config.color }}>例文</p>
        </div>
        <div className="px-4 py-4">
          <p className="font-extrabold text-[17px] text-[#042132] mb-3">{category.demoSentence}</p>
          <AudioPlayer src={category.demoAudioUrl} label="聞いてみる" />
          <div className="mt-3 flex gap-2 items-start">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: config.color + '18' }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="3">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <p className="text-[13px] text-[#5A6B7D] leading-relaxed">{category.demoExplanation}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 text-white rounded-2xl text-[15px] font-extrabold active:scale-[0.97] transition-transform"
        style={{
          backgroundColor: config.color,
          boxShadow: `0 8px 24px -4px ${config.color}35`,
        }}
      >
        チェック開始
      </button>
    </div>
  );
}
