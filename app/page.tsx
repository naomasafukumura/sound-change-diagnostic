'use client';

import { useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { isCompleted } from '@/lib/storage';

const subscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

function LinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function ElisionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

function WeakFormIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

const cats = [
  {
    icon: <LinkIcon />,
    title: '連結',
    subtitle: 'くっつく',
    example: 'check it out → チェキラウ',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
  {
    icon: <ElisionIcon />,
    title: '脱落',
    subtitle: '消える',
    example: 'good morning → グッモーニン',
    color: '#f97316',
    bgColor: '#fff7ed',
    borderColor: '#fed7aa',
  },
  {
    icon: <WeakFormIcon />,
    title: '弱形',
    subtitle: '弱くなる',
    example: 'I want to go → アイワナゴー',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    borderColor: '#c4b5fd',
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
          className="w-full py-3.5 bg-[#0f172a] text-white rounded-xl text-sm font-bold tracking-wide active:scale-[0.98] transition-transform"
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
          <p className="text-[#3b82f6] font-bold text-xs tracking-[0.15em] mb-3">LISTENING CHECK</p>
          <h1 className="text-[26px] font-black leading-[1.4] mb-3">
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
              className="animate-slide-up flex items-center gap-4 p-4 rounded-xl border"
              style={{
                animationDelay: `${(i + 1) * 100}ms`,
                borderColor: c.borderColor,
                backgroundColor: c.bgColor,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: c.color + '15' }}
              >
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-[15px]">{c.title}</span>
                  <span className="text-[#94a3b8] text-xs">({c.subtitle})</span>
                </div>
                <p className="text-[#64748b] text-[13px] mt-0.5">{c.example}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="animate-slide-up mt-8 rounded-xl border border-[#e2e8f0] p-5" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#0f172a] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">10</span>
            </div>
            <span className="font-bold text-[15px]">問のクイズで弱点がわかる</span>
          </div>
          <p className="text-[#64748b] text-sm leading-relaxed">
            音声を聞いて答えるだけ。自分がどのタイプが苦手なのか、3分でチェックできます。
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 px-6 py-5 bg-gradient-to-t from-white via-white to-white/0">
        <button
          onClick={() => router.push('/quiz')}
          className="animate-slide-up w-full py-4 bg-[#0f172a] text-white rounded-xl text-base font-bold tracking-wide active:scale-[0.98] transition-transform"
          style={{ animationDelay: '500ms' }}
        >
          診断をはじめる
        </button>
      </div>
    </div>
  );
}
