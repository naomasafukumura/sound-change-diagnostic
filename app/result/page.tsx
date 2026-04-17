'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { DiagnosticResult, SoundChangeCategory } from '@/data/types';
import { getSavedResult } from '@/lib/storage';
import { ResultChart } from '@/components/ResultChart';

const categoryConfig: Record<SoundChangeCategory, { title: string; color: string }> = {
  linking: { title: '連結', color: '#0483F0' },
  elision: { title: '脱落', color: '#F97316' },
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
  const scoreColor = pct >= 80 ? '#34D399' : pct >= 50 ? '#FBBF24' : '#F87171';

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div
        className="px-5 pt-10 pb-14 text-center"
        style={{ background: 'linear-gradient(180deg, #042132 0%, #0A3350 100%)' }}
      >
        <p className="text-[11px] font-bold text-[#7A9BB5] tracking-widest mb-5">診断結果</p>
        <div className="relative inline-flex items-center justify-center w-36 h-36 mb-5">
          <svg className="absolute inset-0" viewBox="0 0 144 144">
            <circle cx="72" cy="72" r="62" fill="none" stroke="#ffffff08" strokeWidth="8" />
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
            <span className="text-[48px] font-black text-white tabular-nums leading-none">{pct}</span>
            <span className="text-lg font-bold text-[#7A9BB5]">%</span>
          </div>
        </div>
        <p className="text-[#7A9BB5] text-[14px]">
          {totalQuestions}問中 <span className="font-bold text-white">{totalCorrect}問</span> 正解
        </p>
      </div>

      {/* Score Card */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl border border-[#E8ECF0] p-5 mb-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <ResultChart scores={result.scores} />
        </div>

        {/* Weakness */}
        {weakConfig && totalCorrect < totalQuestions && (
          <div
            className="p-4 rounded-2xl mb-5 animate-slide-up"
            style={{ backgroundColor: weakConfig.color + '08', border: `1px solid ${weakConfig.color}20` }}
          >
            <p className="font-extrabold text-[14px] mb-1" style={{ color: weakConfig.color }}>
              {weakConfig.title} が一番の伸びしろ
            </p>
            <p className="text-[13px] text-[#5A6B7D] leading-[1.7]">{result.comment}</p>
          </div>
        )}

        {totalCorrect === totalQuestions && (
          <div className="p-4 rounded-2xl mb-5 animate-slide-up" style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D020' }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-[#34D399] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-extrabold text-[14px] text-[#042132]">パーフェクト!</p>
            </div>
            <p className="text-[13px] text-[#5A6B7D] leading-[1.7]">{result.comment}</p>
          </div>
        )}

        {/* CTA */}
        <div
          className="rounded-2xl p-6 text-center mb-8"
          style={{ background: 'linear-gradient(180deg, #042132 0%, #0A3350 100%)' }}
        >
          <p className="text-white text-[17px] font-extrabold mb-2 leading-[1.6]">
            あなたの弱点に合わせた
            <br />
            カリキュラムを作成します
          </p>
          <p className="text-[#7A9BB5] text-[13px] mb-5">無料カウンセリングで詳しく診断</p>
          <a
            href={CTA_URL}
            className="block w-full py-4 text-white rounded-2xl text-[15px] font-extrabold active:scale-[0.97] transition-transform"
            style={{
              background: 'linear-gradient(135deg, #0483F0 0%, #0066CC 100%)',
              boxShadow: '0 6px 20px -4px rgba(4, 131, 240, 0.4)',
            }}
          >
            カリキュラム相談はこちら
          </a>
        </div>
      </div>
    </div>
  );
}
