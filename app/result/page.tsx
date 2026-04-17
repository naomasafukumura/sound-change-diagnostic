'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { DiagnosticResult, SoundChangeCategory } from '@/data/types';
import { getSavedResult } from '@/lib/storage';
import { ResultChart } from '@/components/ResultChart';

const categoryTitles: Record<SoundChangeCategory, string> = {
  linking: '連結（くっつく）',
  elision: '脱落（消える）',
  weakForm: '弱形（弱くなる）',
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

  return (
    <div className="px-5 py-8">
      <h1 className="text-2xl font-bold text-center mb-2">診断結果</h1>
      <p className="text-center text-slate-500 mb-8">
        {totalCorrect} / {totalQuestions} 問正解
      </p>

      <ResultChart scores={result.scores} />

      <div className="mt-8 space-y-4">
        {(Object.entries(result.scores) as [SoundChangeCategory, { correct: number; total: number }][]).map(
          ([cat, score]) => (
            <div
              key={cat}
              className={`p-4 rounded-xl border-2 ${
                cat === result.weakestCategory && totalCorrect < totalQuestions
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-slate-100 bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{categoryTitles[cat]}</span>
                <span className="text-lg font-bold">
                  {score.correct} / {score.total}
                </span>
              </div>
              {cat === result.weakestCategory && totalCorrect < totalQuestions && (
                <p className="text-sm text-slate-600 mt-2">ここが一番の伸びしろです</p>
              )}
            </div>
          )
        )}
      </div>

      <div className="mt-8 p-5 bg-blue-50 rounded-xl">
        <p className="text-base leading-relaxed">{result.comment}</p>
      </div>

      <div className="mt-10 text-center">
        <p className="text-lg font-bold mb-3">
          あなたの弱点に合わせた
          <br />
          カリキュラムを作成します
        </p>
        <a
          href={CTA_URL}
          className="inline-block w-full py-4 bg-blue-500 text-white rounded-2xl text-lg font-bold active:scale-95 transition-transform text-center"
        >
          カリキュラム相談はこちら
        </a>
      </div>
    </div>
  );
}
