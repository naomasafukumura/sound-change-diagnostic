'use client';

import { CategoryIntro as CategoryIntroType } from '../data/types';
import { AudioPlayer } from './AudioPlayer';

interface CategoryIntroProps {
  category: CategoryIntroType;
  onNext: () => void;
}

export function CategoryIntroCard({ category, onNext }: CategoryIntroProps) {
  return (
    <div className="px-5 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">{category.title}</h2>
        <p className="text-slate-500">{category.subtitle}</p>
      </div>

      <p className="text-base leading-relaxed mb-6">{category.description}</p>

      <div className="bg-slate-50 rounded-xl p-4 mb-6">
        <p className="text-sm text-slate-500 mb-2">例: {category.demoSentence}</p>
        <AudioPlayer src={category.demoAudioUrl} label="デモを聞く" />
        <p className="text-sm text-slate-600 mt-3">{category.demoExplanation}</p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 bg-blue-500 text-white rounded-2xl text-lg font-medium active:scale-95 transition-transform"
      >
        チェック開始
      </button>
    </div>
  );
}
