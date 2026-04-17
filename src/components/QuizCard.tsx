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
      <div className="inline-block px-3 py-1 rounded-lg text-[11px] text-[#8494A7] font-semibold mb-4" style={{ backgroundColor: '#F4F6F8' }}>
        {question.situation}
      </div>

      <div className="mb-6">
        <AudioPlayer src={question.audioUrl} label="音声を聞く" size="lg" />
      </div>

      <p className="text-[14px] font-extrabold text-[#042132] mb-3">何と言っていますか？</p>

      <div className="space-y-2.5 mb-5">
        {question.choices.map((choice, i) => {
          const isAnswer = showResult && i === question.correctIndex;
          const isWrong = showResult && i === selectedIndex && i !== question.correctIndex;
          const isDimmed = showResult && !isAnswer && !isWrong;

          let borderColor = '#E8ECF0';
          let bgColor = '#FFFFFF';
          if (isAnswer) { borderColor = '#34D399'; bgColor = '#ECFDF5'; }
          if (isWrong) { borderColor = '#F87171'; bgColor = '#FEF2F2'; }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className="w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all text-[14px] font-semibold"
              style={{
                borderColor,
                backgroundColor: bgColor,
                color: '#042132',
                opacity: isDimmed ? 0.35 : 1,
              }}
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] font-extrabold shrink-0 transition-all"
                  style={
                    isAnswer
                      ? { backgroundColor: '#34D399', borderColor: '#34D399', color: '#fff' }
                      : isWrong
                      ? { backgroundColor: '#F87171', borderColor: '#F87171', color: '#fff' }
                      : { borderColor: '#D1D5DB', color: '#9CA3AF' }
                  }
                >
                  {isAnswer ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : isWrong ? (
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
            style={{ backgroundColor: isCorrect ? '#ECFDF5' : '#FEF2F2' }}
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: isCorrect ? '#34D399' : '#F87171' }}
              >
                {isCorrect ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
              <p className="font-extrabold text-[16px] text-[#042132]">
                {isCorrect ? '正解!' : '不正解'}
              </p>
            </div>
            <p className="text-[13px] text-[#5A6B7D] leading-[1.7]">{question.explanation}</p>
          </div>

          <div className="rounded-2xl border border-[#E8ECF0] overflow-hidden">
            <div className="px-4 py-2.5 bg-[#F4F6F8] border-b border-[#E8ECF0]">
              <p className="text-[11px] font-bold text-[#8494A7] tracking-wider">音声変化ポイント</p>
            </div>
            <div className="px-4 py-3 space-y-2.5">
              {question.soundChanges.map((sc, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#0483F0] flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                  <p className="text-[13px] leading-relaxed">
                    <span className="font-bold text-[#042132]">{sc.position}</span>
                    <span className="text-[#5A6B7D] ml-1.5">{sc.explanation}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-[#E8ECF0]">
              <AudioPlayer src={question.audioUrl} label="もう一度聞く" size="sm" />
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-full py-4 text-white rounded-2xl text-[15px] font-extrabold active:scale-[0.97] transition-transform"
            style={{
              background: 'linear-gradient(135deg, #042132 0%, #0A3350 100%)',
            }}
          >
            次の問題へ
          </button>
        </div>
      )}
    </div>
  );
}
