'use client';

import { useState } from 'react';
import { startRecording, transcribeAudio } from '../lib/audio';

interface VoiceRecorderProps {
  expectedSentence: string;
}

export function VoiceRecorder({ expectedSentence }: VoiceRecorderProps) {
  const [state, setState] = useState<'idle' | 'recording' | 'processing' | 'done'>('idle');
  const [recorder, setRecorder] = useState<{ stop: () => Promise<Blob> } | null>(null);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  const handleStart = async () => {
    try {
      setError('');
      const rec = await startRecording();
      setRecorder(rec);
      setState('recording');
    } catch {
      setError('マイクへのアクセスを許可してください');
    }
  };

  const handleStop = async () => {
    if (!recorder) return;
    setState('processing');
    try {
      const blob = await recorder.stop();
      const text = await transcribeAudio(blob);
      setTranscript(text);
      setState('done');
    } catch {
      setError('音声の処理に失敗しました');
      setState('idle');
    }
  };

  if (state === 'done') {
    return (
      <div className="animate-fade-in rounded-2xl border border-[#e2e8f0] overflow-hidden">
        <div className="px-4 py-3 bg-[#f8f9fb]">
          <p className="text-xs text-[#94a3b8] mb-1">あなたの発音</p>
          <p className="font-medium">{transcript}</p>
        </div>
        <div className="px-4 py-3">
          <p className="text-xs text-[#94a3b8] mb-1">お手本</p>
          <p className="font-medium">{expectedSentence}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">Try it yourself</p>
      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
      {state === 'recording' ? (
        <button
          onClick={handleStop}
          className="flex items-center justify-center gap-2 w-full py-3 bg-red-500 text-white rounded-2xl font-bold active:scale-[0.98] transition-transform"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-rec" />
          タップして停止
        </button>
      ) : state === 'processing' ? (
        <div className="flex items-center justify-center gap-2 py-3 text-[#94a3b8] text-sm">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          判定中...
        </div>
      ) : (
        <button
          onClick={handleStart}
          className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-[#cbd5e1] text-[#64748b] rounded-2xl font-medium active:scale-[0.98] transition-transform hover:border-[#3b82f6] hover:text-[#3b82f6]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4z" />
            <path d="M6 10a6 6 0 0 0 12 0h-2a4 4 0 0 1-8 0H6z" />
            <rect x="11" y="18" width="2" height="4" rx="1" />
          </svg>
          自分でも言ってみる
        </button>
      )}
    </div>
  );
}
