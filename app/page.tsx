'use client';

import { useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { isCompleted } from '@/lib/storage';

const subscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

const cats = [
  {
    icon: '🔗',
    title: '連結',
    subtitle: 'くっつく',
    example: 'check it out → チェキラウ',
    border: 'border-blue-200',
    bg: 'bg-blue-50',
  },
  {
    icon: '💨',
    title: '脱落',
    subtitle: '消える',
    example: "good morning → グッモーニン",
    border: 'border-orange-200',
    bg: 'bg-orange-50',
  },
  {
    icon: '🔉',
    title: '弱形',
    subtitle: '弱くなる',
    example: 'I want to go → アイワナゴー',
    border: 'border-purple-200',
    bg: 'bg-purple-50',
  },
];

export default function IntroPage() {
  const router = useRouter();
  const hydrated = useHydrated();

  if (!hydrated) return null;

  if (isCompleted()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh px-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-xl font-bold mb-2">診断済みです</h1>
        <p className="text-[#475569] text-sm mb-6">この診断は一度のみ受けられます</p>
        <button
          onClick={() => router.push('/result')}
          className="w-full py-3.5 bg-[#3b82f6] text-white rounded-xl font-bold active:scale-[0.98] transition-transform"
        >
          結果を見る
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="flex-1 px-6 pt-12 pb-6">
        <div className="animate-fade-in">
          <p className="text-[#3b82f6] font-bold text-sm tracking-wider mb-3">LISTENING CHECK</p>
          <h1 className="text-[28px] font-black leading-tight mb-3">
            英語が聞き取れない
            <br />
            本当の理由、
            <br />
            知っていますか？
          </h1>
          <p className="text-[#475569] text-[15px] leading-relaxed">
            単語を知らないからじゃない。
            <br />
            <span className="font-bold text-[#0f172a]">音が変わっている</span>からです。
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {cats.map((c, i) => (
            <div
              key={c.title}
              className={`animate-slide-up flex items-center gap-4 p-4 rounded-2xl border ${c.border} ${c.bg}`}
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <span className="text-2xl">{c.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold">{c.title}</span>
                  <span className="text-[#94a3b8] text-xs">({c.subtitle})</span>
                </div>
                <p className="text-[#475569] text-sm mt-0.5">{c.example}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="animate-slide-up mt-8 bg-[#f8f9fb] rounded-2xl p-5" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-bold">10</span>
            </div>
            <span className="font-bold text-[15px]">問のクイズで弱点がわかる</span>
          </div>
          <p className="text-[#475569] text-sm leading-relaxed">
            音声を聞いて答えるだけ。自分がどのタイプが苦手なのか、3分でチェックできます。
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 px-6 py-5 bg-gradient-to-t from-white via-white to-white/0">
        <button
          onClick={() => router.push('/quiz')}
          className="animate-slide-up w-full py-4 bg-[#3b82f6] text-white rounded-2xl text-lg font-bold active:scale-[0.98] transition-transform shadow-lg shadow-blue-500/20"
          style={{ animationDelay: '500ms' }}
        >
          診断をはじめる
        </button>
      </div>
    </div>
  );
}
