'use client';

import { useState } from 'react';
import { Question } from '../data/types';
import { AudioPlayer } from './AudioPlayer';
import { VoiceRecorder } from './VoiceRecorder';

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, selectedIndex: number) => void;
  onNext: () => void;
}

export function QuizCard({ question, onAnswer, onNext }: QuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedIndex(index);
    const correct = index === question.correctIndex;
    setShowResult(true);
    onAnswer(correct, index);
  };

  const isCorrect = selectedIndex === question.correctIndex;

  return (
    <div className="animate-fade-in px-5 py-5">
      <div className="inline-block px-3 py-1 rounded-full bg-[#f1f5f9] text-xs text-[#64748b] font-medium mb-4">
        {question.situation}
      </div>

      <div className="mb-5">
        <AudioPlayer src={question.audioUrl} label="音声を聞く" size="lg" />
      </div>

      <p className="text-[15px] font-bold text-[#0f172a] mb-3">何と言っていますか？</p>

      <div className="space-y-2.5 mb-5">
        {question.choices.map((choice, i) => {
          let cls = 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1]';
          if (showResult) {
            if (i === question.correctIndex)
              cls = 'border-green-400 bg-green-50';
            else if (i === selectedIndex)
              cls = 'border-red-400 bg-red-50';
            else
              cls = 'border-[#e2e8f0] bg-white opacity-50';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all text-[15px] ${cls}`}
            >
              <span className="inline-flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                  showResult && i === question.correctIndex
                    ? 'border-green-500 bg-green-500 text-white'
                    : showResult && i === selectedIndex
                    ? 'border-red-500 bg-red-500 text-white'
                    : 'border-[#cbd5e1] text-[#94a3b8]'
                }`}>
                  {showResult && i === question.correctIndex ? '✓' : showResult && i === selectedIndex ? '✕' : String.fromCharCode(65 + i)}
                </span>
                {choice}
              </span>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="animate-slide-up space-y-4">
          <div className={`p-4 rounded-2xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className="font-bold text-[15px] mb-1.5">
              {isCorrect ? '🎉 正解!' : '😮 不正解'}
            </p>
            <p className="text-sm text-[#475569] leading-relaxed">{question.explanation}</p>
          </div>

          <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e2e8f0]">
              <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Sound Changes</p>
            </div>
            <div className="px-4 py-3 space-y-2">
              {question.soundChanges.map((sc, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#3b82f6] mt-0.5">→</span>
                  <p className="text-sm">
                    <span className="font-bold text-[#0f172a]">{sc.position}</span>
                    <span className="text-[#64748b] ml-1.5">{sc.explanation}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-[#e2e8f0]">
              <AudioPlayer src={question.audioUrl} label="もう一度聞く" size="sm" />
            </div>
          </div>

          <VoiceRecorder expectedSentence={question.sentence} />

          <button
            onClick={onNext}
            className="w-full py-4 bg-[#0f172a] text-white rounded-2xl text-base font-bold active:scale-[0.98] transition-transform"
          >
            次の問題へ →
          </button>
        </div>
      )}
    </div>
  );
}
