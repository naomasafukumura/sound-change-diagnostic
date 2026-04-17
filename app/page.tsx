'use client';

import { useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { isCompleted } from '@/lib/storage';

const subscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export default function IntroPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const [completed] = useState(() => isCompleted());

  if (!hydrated) return null;

  if (completed) {
    return (
      <div className="px-5 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">診断済みです</h1>
        <p className="text-slate-600 mb-6">この診断は一度のみ受けられます。</p>
        <button
          onClick={() => router.push('/result')}
          className="py-3 px-8 bg-blue-500 text-white rounded-2xl font-medium"
        >
          結果を見る
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 py-12">
      <h1 className="text-3xl font-bold mb-2">音声変化診断</h1>
      <p className="text-lg text-slate-500 mb-8">3分であなたのリスニングの弱点がわかる</p>

      <div className="space-y-6 mb-10">
        <p className="text-base leading-relaxed">
          英語が聞き取れないのは、単語を知らないからではありません。音が変わっているからです。
        </p>
        <p className="text-base leading-relaxed">英語の音声変化は、大きく3つに分かれます。</p>

        <div className="space-y-3">
          {[
            { title: '連結（くっつく）', desc: '単語と単語の音が繋がる' },
            { title: '脱落（消える）', desc: 't, dなどの音が消える' },
            { title: '弱形（弱くなる）', desc: 'can, toなどの音が弱くなる' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-base leading-relaxed">
          10問のクイズで、あなたがどのタイプの音声変化が苦手なのかをチェックしましょう。
        </p>
      </div>

      <button
        onClick={() => router.push('/quiz')}
        className="w-full py-4 bg-blue-500 text-white rounded-2xl text-lg font-bold active:scale-95 transition-transform"
      >
        診断をはじめる
      </button>
    </div>
  );
}
