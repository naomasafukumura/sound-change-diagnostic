'use client';

import { useState } from 'react';
import { startRecording, transcribeAudio } from '../lib/audio';

interface VoiceRecorderProps {
  expectedSentence: string;
  onComplete?: (transcript: string) => void;
}

export function VoiceRecorder({ expectedSentence, onComplete }: VoiceRecorderProps) {
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
      onComplete?.(text);
    } catch {
      setError('音声の処理に失敗しました。もう一度お試しください。');
      setState('idle');
    }
  };

  if (state === 'done') {
    return (
      <div className="mt-4 p-4 bg-slate-50 rounded-xl">
        <p className="text-sm text-slate-500 mb-1">あなたの発音:</p>
        <p className="text-lg font-medium">{transcript}</p>
        <p className="text-sm text-slate-500 mt-2">お手本:</p>
        <p className="text-lg">{expectedSentence}</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-slate-500 mb-3">自分でも言ってみよう</p>
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      {state === 'recording' ? (
        <button
          onClick={handleStop}
          className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-red-600 text-white rounded-2xl font-medium animate-pulse"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect x="4" y="4" width="12" height="12" rx="2" />
          </svg>
          録音を停止
        </button>
      ) : state === 'processing' ? (
        <div className="text-center py-3 text-slate-500">判定中...</div>
      ) : (
        <button
          onClick={handleStart}
          className="flex items-center justify-center gap-2 w-full py-3 px-6 border-2 border-blue-500 text-blue-500 rounded-2xl font-medium active:scale-95 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 1a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M5 9a5 5 0 0 0 10 0h-2a3 3 0 0 1-6 0H5z" />
            <rect x="9" y="15" width="2" height="3" rx="1" />
          </svg>
          録音する
        </button>
      )}
    </div>
  );
}
