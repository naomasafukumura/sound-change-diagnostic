'use client';

import { CategoryIntro as CategoryIntroType } from '../data/types';
import { AudioPlayer } from './AudioPlayer';

interface CategoryIntroProps {
  category: CategoryIntroType;
  onNext: () => void;
}

const categoryEmoji: Record<string, string> = {
  linking: '🔗',
  elision: '💨',
  weakForm: '🔉',
};

const categoryColor: Record<string, string> = {
  linking: '#3b82f6',
  elision: '#f97316',
  weakForm: '#8b5cf6',
};

export function CategoryIntroCard({ category, onNext }: CategoryIntroProps) {
  const color = categoryColor[category.category] || '#3b82f6';

  return (
    <div className="animate-fade-in px-6 py-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{categoryEmoji[category.category]}</span>
        <div>
          <h2 className="text-2xl font-black">{category.title}</h2>
          <p className="text-[#94a3b8] text-sm">{category.subtitle}</p>
        </div>
      </div>

      <p className="text-[15px] text-[#475569] leading-relaxed mb-6">{category.description}</p>

      <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden mb-8">
        <div className="px-4 py-3 bg-[#f8f9fb] border-b border-[#e2e8f0]">
          <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Example</p>
        </div>
        <div className="px-4 py-4">
          <p className="font-bold text-lg mb-3">{category.demoSentence}</p>
          <AudioPlayer src={category.demoAudioUrl} label="聞いてみる" />
          <div className="mt-3 flex gap-2 items-start">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="mt-0.5 shrink-0">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <p className="text-sm text-[#475569] leading-relaxed">{category.demoExplanation}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 text-white rounded-2xl text-lg font-bold active:scale-[0.98] transition-transform shadow-lg"
        style={{ backgroundColor: color, boxShadow: `0 8px 20px -4px ${color}33` }}
      >
        チェック開始
      </button>
    </div>
  );
}
