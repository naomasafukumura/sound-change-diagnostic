'use client';

import { CategoryIntro as CategoryIntroType } from '../data/types';
import { AudioPlayer } from './AudioPlayer';

interface CategoryIntroProps {
  category: CategoryIntroType;
  onNext: () => void;
}

const categoryConfig: Record<string, { color: string; sub: string }> = {
  linking: { color: '#0483F0', sub: 'Linking' },
  elision: { color: '#F0844C', sub: 'Elision' },
  weakForm: { color: '#8B5CF6', sub: 'Weak Form' },
};

export function CategoryIntroCard({ category, onNext }: CategoryIntroProps) {
  const config = categoryConfig[category.category] || { color: '#0483F0', sub: '' };

  return (
    <div className="animate-fade-in px-5 py-8">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: config.color + '14' }}
        >
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
        </div>
        <div>
          <h2 className="text-xl font-extrabold">{category.title}</h2>
          <p className="text-[#8FA3B8] text-xs font-semibold">{config.sub} / {category.subtitle}</p>
        </div>
      </div>

      <p className="text-[14px] text-[#6B7B8D] leading-relaxed mb-6">{category.description}</p>

      <div className="rounded-2xl bg-[#F7F8FA] overflow-hidden mb-8">
        <div className="px-4 py-3 border-b border-[#EEF0F3]">
          <p className="text-[11px] font-bold text-[#8FA3B8] uppercase tracking-wider">Example</p>
        </div>
        <div className="px-4 py-4">
          <p className="font-extrabold text-lg mb-3">{category.demoSentence}</p>
          <AudioPlayer src={category.demoAudioUrl} label="聞いてみる" />
          <div className="mt-3 flex gap-2 items-start">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: config.color + '14' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="3">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <p className="text-[13px] text-[#6B7B8D] leading-relaxed">{category.demoExplanation}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 text-white rounded-2xl text-base font-extrabold active:scale-[0.98] transition-transform"
        style={{ backgroundColor: config.color }}
      >
        チェック開始
      </button>
    </div>
  );
}
