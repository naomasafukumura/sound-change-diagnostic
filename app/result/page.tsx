'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { DiagnosticResult, SoundChangeCategory } from '@/data/types';
import { getSavedResult } from '@/lib/storage';
import { ResultChart } from '@/components/ResultChart';

const categoryConfig: Record<SoundChangeCategory, { title: string; color: string }> = {
  linking: { title: '連結', color: '#0483F0' },
  elision: { title: '脱落', color: '#F0844C' },
  weakForm: { title: '弱形', color: '#8B5CF6' },
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
  const scoreColor = pct >= 80 ? '#48DE82' : pct >= 50 ? '#F0DA4C' : '#EF4444';

  return (
    <div className="animate-fade-in">
      <div className="bg-[#042132] px-5 pt-10 pb-12 rounded-b-[32px] text-center">
        <p className="text-[11px] font-bold text-[#8FA3B8] tracking-widest mb-4">診断結果</p>
        <div className="relative inline-flex items-center justify-center w-36 h-36 mb-4">
          <svg className="absolute inset-0" viewBox="0 0 144 144">
            <circle cx="72" cy="72" r="62" fill="none" stroke="#ffffff10" strokeWidth="8" />
            <circle
              cx="72" cy="72" r="62"
              fill="none"
              stroke={scoreColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 390} 390`}
              transform="rotate(-90 72 72)"
              style={{ animation: 'circleGrow 1.2s ease-out' }}
            />
          </svg>
          <div>
            <span className="text-5xl font-black text-white tabular-nums">{pct}</span>
            <span className="text-lg font-bold text-[#8FA3B8]">%</span>
          </div>
        </div>
        <p className="text-[#8FA3B8] text-sm">
          {totalQuestions}問中 <span className="font-bold text-white">{totalCorrect}問</span> 正解
        </p>
      </div>

      <div className="px-5 -mt-5">
        <div className="bg-white rounded-2xl border border-[#EEF0F3] p-5 mb-5">
          <ResultChart scores={result.scores} />
        </div>

        {weakConfig && totalCorrect < totalQuestions && (
          <div
            className="p-4 rounded-2xl mb-5 animate-slide-up"
            style={{ backgroundColor: weakConfig.color + '0A', border: `1px solid ${weakConfig.color}25` }}
          >
            <p className="font-extrabold text-sm mb-1" style={{ color: weakConfig.color }}>
              {weakConfig.title} が一番の伸びしろ
            </p>
            <p className="text-[13px] text-[#6B7B8D] leading-relaxed">{result.comment}</p>
          </div>
        )}

        {totalCorrect === totalQuestions && (
          <div className="p-4 rounded-2xl bg-[#E8FAF0] border border-[#48DE82]/25 mb-5 animate-slide-up">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-[#48DE82] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-extrabold text-sm text-[#042132]">パーフェクト!</p>
            </div>
            <p className="text-[13px] text-[#6B7B8D] leading-relaxed">{result.comment}</p>
          </div>
        )}

        <div className="rounded-2xl bg-[#042132] p-6 text-center mb-8">
          <p className="text-white text-[17px] font-extrabold mb-2 leading-relaxed">
            あなたの弱点に合わせた
            <br />
            カリキュラムを作成します
          </p>
          <p className="text-[#8FA3B8] text-[13px] mb-5">無料カウンセリングで詳しく診断</p>
          <a
            href={CTA_URL}
            className="block w-full py-4 bg-[#0483F0] text-white rounded-2xl text-base font-extrabold active:scale-[0.98] transition-transform"
          >
            カリキュラム相談はこちら
          </a>
        </div>
      </div>
    </div>
  );
}
