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
    title: '連結',
    sub: 'Linking',
    desc: '音がつながって別の音に聞こえる',
    color: '#0483F0',
  },
  {
    title: '脱落',
    sub: 'Elision',
    desc: '音が消えて聞こえなくなる',
    color: '#F0844C',
  },
  {
    title: '弱形',
    sub: 'Weak Form',
    desc: '音が弱くなって聞き取れない',
    color: '#8B5CF6',
  },
];

export default function IntroPage() {
  const router = useRouter();
  const hydrated = useHydrated();

  if (!hydrated) return null;

  if (isCompleted()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh px-6">
        <div className="w-14 h-14 rounded-full bg-[#E8FAF0] flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#48DE82" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-lg font-extrabold mb-1.5">診断済みです</h1>
        <p className="text-[#6B7B8D] text-sm mb-6">この診断は一度のみ受けられます</p>
        <button
          onClick={() => router.push('/result')}
          className="w-full py-3.5 bg-[#0483F0] text-white rounded-2xl text-sm font-bold active:scale-[0.98] transition-transform"
        >
          結果を見る
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="bg-[#042132] px-6 pt-14 pb-10 rounded-b-[32px]">
        <div className="animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#48DE82] text-xs font-bold tracking-wider mb-4">
            LISTENING CHECK
          </div>
          <h1 className="text-[24px] font-black leading-[1.45] text-white mb-3">
            英語が聞き取れない
            <br />
            本当の原因を
            <br />
            3分で診断
          </h1>
          <p className="text-[#8FA3B8] text-[14px] leading-relaxed">
            音声を聞いて、聞こえた英語を選ぶだけ。
            <br />
            あなたのリスニングの弱点がわかります。
          </p>
        </div>
      </div>

      <div className="flex-1 px-5 -mt-5">
        <div className="space-y-3">
          {cats.map((c, i) => (
            <div
              key={c.title}
              className="animate-slide-up flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#EEF0F3]"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: c.color + '14' }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-extrabold text-[15px]">{c.title}</span>
                  <span className="text-[#8FA3B8] text-xs font-semibold">{c.sub}</span>
                </div>
                <p className="text-[#6B7B8D] text-[13px] mt-0.5">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="animate-slide-up mt-5 flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#F7F8FA]"
          style={{ animationDelay: '400ms' }}
        >
          <div className="w-9 h-9 rounded-xl bg-[#042132] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-extrabold">10</span>
          </div>
          <p className="text-[13px] text-[#6B7B8D] leading-relaxed">
            <span className="font-bold text-[#042132]">10問</span>のクイズに答えるだけ
          </p>
        </div>
      </div>

      <div className="px-5 py-6">
        <button
          onClick={() => router.push('/quiz')}
          className="animate-slide-up w-full py-4 bg-[#0483F0] text-white rounded-2xl text-base font-extrabold active:scale-[0.98] transition-transform"
          style={{ animationDelay: '500ms' }}
        >
          診断スタート
        </button>
      </div>
    </div>
  );
}
