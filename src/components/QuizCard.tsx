'use client';

import { useState } from 'react';
import { Question } from '../data/types';
import { AudioPlayer } from './AudioPlayer';

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
      <div className="inline-block px-3 py-1 rounded-lg bg-[#F7F8FA] text-[11px] text-[#8FA3B8] font-semibold mb-4">
        {question.situation}
      </div>

      <div className="mb-5">
        <AudioPlayer src={question.audioUrl} label="音声を聞く" size="lg" />
      </div>

      <p className="text-[14px] font-extrabold text-[#042132] mb-3">何と言っていますか？</p>

      <div className="space-y-2.5 mb-5">
        {question.choices.map((choice, i) => {
          let borderColor = '#EEF0F3';
          let bgColor = '#FFFFFF';
          let textColor = '#042132';
          let opacity = 1;

          if (showResult) {
            if (i === question.correctIndex) {
              borderColor = '#48DE82';
              bgColor = '#E8FAF0';
            } else if (i === selectedIndex) {
              borderColor = '#EF4444';
              bgColor = '#FEF2F2';
            } else {
              opacity = 0.4;
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className="w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all text-[14px] font-semibold"
              style={{ borderColor, backgroundColor: bgColor, color: textColor, opacity }}
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-extrabold shrink-0"
                  style={
                    showResult && i === question.correctIndex
                      ? { backgroundColor: '#48DE82', borderColor: '#48DE82', color: '#fff' }
                      : showResult && i === selectedIndex
                      ? { backgroundColor: '#EF4444', borderColor: '#EF4444', color: '#fff' }
                      : { borderColor: '#D1D5DB', color: '#8FA3B8' }
                  }
                >
                  {showResult && i === question.correctIndex ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : showResult && i === selectedIndex ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
            className="p-4 rounded-2xl"
            style={{
              backgroundColor: isCorrect ? '#E8FAF0' : '#FEF2F2',
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: isCorrect ? '#48DE82' : '#EF4444' }}
              >
                {isCorrect ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
              <p className="font-extrabold text-[15px]">
                {isCorrect ? '正解!' : '不正解'}
              </p>
            </div>
            <p className="text-[13px] text-[#6B7B8D] leading-relaxed">{question.explanation}</p>
          </div>

          <div className="rounded-2xl bg-[#F7F8FA] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#EEF0F3]">
              <p className="text-[11px] font-bold text-[#8FA3B8] uppercase tracking-wider">Sound Changes</p>
            </div>
            <div className="px-4 py-3 space-y-2">
              {question.soundChanges.map((sc, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0483F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <p className="text-[13px]">
                    <span className="font-bold text-[#042132]">{sc.position}</span>
                    <span className="text-[#6B7B8D] ml-1.5">{sc.explanation}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-[#EEF0F3]">
              <AudioPlayer src={question.audioUrl} label="もう一度聞く" size="sm" />
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-full py-4 bg-[#042132] text-white rounded-2xl text-base font-extrabold active:scale-[0.98] transition-transform"
          >
            次の問題へ
          </button>
        </div>
      )}
    </div>
  );
}
