'use client';

import { useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { isCompleted } from '@/lib/storage';

const subscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

const cats = [
  { title: '連結', sub: '音がくっつく', example: 'check it out → チェキラウ' },
  { title: '脱落', sub: '音が消える', example: 'good morning → グッモーニン' },
  { title: '弱形', sub: '音が弱くなる', example: 'want to → ワナ' },
];

export default function IntroPage() {
  const router = useRouter();
  const hydrated = useHydrated();

  if (!hydrated) return null;

  if (isCompleted()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-dvh px-6 bg-[#FAFBFC]">
        <div className="w-16 h-16 rounded-full bg-[#E8FAF0] flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-lg font-extrabold mb-1">診断済みです</h1>
        <p className="text-[#8494A7] text-sm mb-8">この診断は一度のみ受けられます</p>
        <button
          onClick={() => router.push('/result')}
          className="w-full py-4 text-white rounded-2xl text-[15px] font-bold active:scale-[0.97] transition-transform"
          style={{ background: 'linear-gradient(135deg, #0483F0 0%, #0066CC 100%)' }}
        >
          結果を見る
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div
        className="px-6 pt-16 pb-12"
        style={{ background: 'linear-gradient(180deg, #042132 0%, #0A3350 100%)' }}
      >
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#48DE82]" />
            <span className="text-[#48DE82] text-[11px] font-bold tracking-[0.12em]">リスニング診断</span>
          </div>
          <h1 className="text-[26px] font-black leading-[1.5] text-white mb-4">
            英語が聞き取れない
            <br />
            <span className="text-[#48DE82]">本当の原因</span>を
            <br />
            3分で診断
          </h1>
          <p className="text-[#7A9BB5] text-[14px] leading-[1.7]">
            音声を聞いて、聞こえた英語を選ぶだけ。
            <br />
            あなたのリスニングの弱点がわかります。
          </p>
        </div>
      </div>

      <div className="flex-1 px-5 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl border border-[#E8ECF0] overflow-hidden mb-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          {cats.map((c, i) => (
            <div
              key={c.title}
              className={`animate-slide-up flex items-start gap-4 px-5 py-4 ${i < cats.length - 1 ? 'border-b border-[#F0F2F4]' : ''}`}
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#042132] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-[12px] font-extrabold">{i + 1}</span>
              </div>
              <div className="flex-1">
                <p className="font-extrabold text-[15px] text-[#042132]">
                  {c.title}
                  <span className="font-medium text-[12px] text-[#8494A7] ml-2">{c.sub}</span>
                </p>
                <p className="text-[13px] text-[#6B7B8D] mt-0.5">{c.example}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="animate-slide-up flex items-center gap-3 p-4 rounded-2xl bg-[#F4F6F8]"
          style={{ animationDelay: '350ms' }}
        >
          <div className="w-9 h-9 rounded-lg bg-[#042132] flex items-center justify-center shrink-0">
            <span className="text-[#48DE82] text-[12px] font-extrabold">10</span>
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#042132]">10問のクイズ</p>
            <p className="text-[12px] text-[#8494A7]">所要時間 約3分</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => router.push('/quiz')}
          className="animate-slide-up w-full py-4 text-white rounded-2xl text-[16px] font-extrabold active:scale-[0.97] transition-transform"
          style={{
            animationDelay: '450ms',
            background: 'linear-gradient(135deg, #0483F0 0%, #0066CC 100%)',
            boxShadow: '0 8px 24px -4px rgba(4, 131, 240, 0.35)',
          }}
        >
          診断スタート
        </button>
      </div>
    </div>
  );
}
