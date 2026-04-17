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
      <div className="inline-block px-3 py-1 rounded-lg bg-[#f1f5f9] text-xs text-[#64748b] font-medium mb-4">
        {question.situation}
      </div>

      <div className="mb-5">
        <AudioPlayer src={question.audioUrl} label="音声を聞く" size="lg" />
      </div>

      <p className="text-[15px] font-bold text-[#0f172a] mb-3">何と言っていますか？</p>

      <div className="space-y-2.5 mb-5">
        {question.choices.map((choice, i) => {
          let borderColor = '#e2e8f0';
          let bgColor = '#ffffff';
          let opacity = '1';

          if (showResult) {
            if (i === question.correctIndex) {
              borderColor = '#22c55e';
              bgColor = '#f0fdf4';
            } else if (i === selectedIndex) {
              borderColor = '#ef4444';
              bgColor = '#fef2f2';
            } else {
              opacity = '0.45';
            }
          }

          const indicatorStyle = showResult && i === question.correctIndex
            ? { backgroundColor: '#22c55e', borderColor: '#22c55e', color: '#fff' }
            : showResult && i === selectedIndex
            ? { backgroundColor: '#ef4444', borderColor: '#ef4444', color: '#fff' }
            : { borderColor: '#cbd5e1', color: '#94a3b8' };

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className="w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all text-[15px]"
              style={{ borderColor, backgroundColor: bgColor, opacity }}
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0"
                  style={indicatorStyle}
                >
                  {showResult && i === question.correctIndex ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : showResult && i === selectedIndex ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                {choice}
              </span>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="animate-slide-up space-y-4">
          <div
            className="p-4 rounded-xl border"
            style={{
              backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
              borderColor: isCorrect ? '#bbf7d0' : '#fecaca',
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              {isCorrect ? (
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              )}
              <p className="font-bold text-[15px]">
                {isCorrect ? '正解!' : '不正解'}
              </p>
            </div>
            <p className="text-sm text-[#475569] leading-relaxed">{question.explanation}</p>
          </div>

          <div className="rounded-xl border border-[#e2e8f0] overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f8f9fb] border-b border-[#e2e8f0]">
              <p className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Sound Changes</p>
            </div>
            <div className="px-4 py-3 space-y-2">
              {question.soundChanges.map((sc, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#3b82f6] mt-0.5 shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
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
            className="w-full py-4 bg-[#0f172a] text-white rounded-xl text-base font-bold tracking-wide active:scale-[0.98] transition-transform"
          >
            次の問題へ
          </button>
        </div>
      )}
    </div>
  );
}
