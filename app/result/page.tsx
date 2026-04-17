'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { DiagnosticResult, SoundChangeCategory } from '@/data/types';
import { getSavedResult } from '@/lib/storage';
import { ResultChart } from '@/components/ResultChart';

const categoryConfig: Record<SoundChangeCategory, { title: string; color: string }> = {
  linking: { title: '連結', color: '#3b82f6' },
  elision: { title: '脱落', color: '#f97316' },
  weakForm: { title: '弱形', color: '#8b5cf6' },
};

const CTA_URL = process.env.NEXT_PUBLIC_CTA_URL || '#';

const subscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

function loadResult(): DiagnosticResult | null {
  const saved = getSavedResult();
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

export default function ResultPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const [result] = useState<DiagnosticResult | null>(() => loadResult());

  useEffect(() => {
    if (hydrated && !result) {
      router.replace('/');
    }
  }, [hydrated, result, router]);

  if (!hydrated || !result) return null;

  const totalCorrect = Object.values(result.scores).reduce((s, v) => s + v.correct, 0);
  const totalQuestions = Object.values(result.scores).reduce((s, v) => s + v.total, 0);
  const pct = Math.round((totalCorrect / totalQuestions) * 100);
  const weak = result.weakestCategory;
  const weakConfig = weak ? categoryConfig[weak] : null;

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-10 pb-8 text-center">
        <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-3">Your Result</p>
        <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
          <svg className="absolute inset-0" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="56" fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle
              cx="64" cy="64" r="56"
              fill="none"
              stroke={pct >= 80 ? '#16a34a' : pct >= 50 ? '#f97316' : '#dc2626'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 352} 352`}
              transform="rotate(-90 64 64)"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div>
            <span className="text-4xl font-black tabular-nums">{pct}</span>
            <span className="text-lg font-bold text-[#94a3b8]">%</span>
          </div>
        </div>
        <p className="text-[#475569] text-sm">
          {totalQuestions}問中 <span className="font-bold text-[#0f172a]">{totalCorrect}問</span> 正解
        </p>
      </div>

      <div className="px-5 pb-6">
        <ResultChart scores={result.scores} />
      </div>

      {weakConfig && totalCorrect < totalQuestions && (
        <div
          className="mx-5 mb-6 p-4 rounded-xl border animate-slide-up"
          style={{ borderColor: weakConfig.color + '40', backgroundColor: weakConfig.color + '08' }}
        >
          <p className="font-bold text-sm mb-1.5" style={{ color: weakConfig.color }}>
            {weakConfig.title}が一番の伸びしろ
          </p>
          <p className="text-sm text-[#475569] leading-relaxed">{result.comment}</p>
        </div>
      )}

      {totalCorrect === totalQuestions && (
        <div className="mx-5 mb-6 p-4 rounded-xl bg-green-50 border border-green-200 animate-slide-up">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-bold text-sm text-green-700">パーフェクト!</p>
          </div>
          <p className="text-sm text-[#475569] leading-relaxed">{result.comment}</p>
        </div>
      )}

      <div className="px-5 pb-10">
        <div className="rounded-xl bg-[#0f172a] p-6 text-center">
          <p className="text-white text-lg font-bold mb-2">
            あなたの弱点に合わせた
            <br />
            カリキュラムを作成します
          </p>
          <p className="text-[#94a3b8] text-sm mb-5">無料カウンセリングで詳しく診断</p>
          <a
            href={CTA_URL}
            className="block w-full py-4 bg-white text-[#0f172a] rounded-xl text-base font-bold active:scale-[0.98] transition-transform"
          >
            カリキュラム相談はこちら
          </a>
        </div>
      </div>
    </div>
  );
}
