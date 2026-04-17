'use client';

import { ReactNode } from 'react';
import { CategoryIntro as CategoryIntroType } from '../data/types';
import { AudioPlayer } from './AudioPlayer';

interface CategoryIntroProps {
  category: CategoryIntroType;
  onNext: () => void;
}

const categoryConfig: Record<string, { color: string; icon: ReactNode }> = {
  linking: {
    color: '#3b82f6',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  elision: {
    color: '#f97316',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    ),
  },
  weakForm: {
    color: '#8b5cf6',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    ),
  },
};

export function CategoryIntroCard({ category, onNext }: CategoryIntroProps) {
  const config = categoryConfig[category.category] || { color: '#3b82f6', icon: null };

  return (
    <div className="animate-fade-in px-6 py-8">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: config.color + '12' }}
        >
          {config.icon}
        </div>
        <div>
          <h2 className="text-2xl font-black">{category.title}</h2>
          <p className="text-[#94a3b8] text-sm">{category.subtitle}</p>
        </div>
      </div>

      <p className="text-[15px] text-[#475569] leading-relaxed mb-6">{category.description}</p>

      <div className="rounded-xl border border-[#e2e8f0] overflow-hidden mb-8">
        <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e2e8f0]">
          <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Example</p>
        </div>
        <div className="px-4 py-4">
          <p className="font-bold text-lg mb-3">{category.demoSentence}</p>
          <AudioPlayer src={category.demoAudioUrl} label="聞いてみる" />
          <div className="mt-3 flex gap-2 items-start">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="2" className="mt-0.5 shrink-0">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <p className="text-sm text-[#475569] leading-relaxed">{category.demoExplanation}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 text-white rounded-xl text-base font-bold tracking-wide active:scale-[0.98] transition-transform"
        style={{ backgroundColor: config.color }}
      >
        チェック開始
      </button>
    </div>
  );
}
