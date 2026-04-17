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
    <div className="px-5 py-6">
      <p className="text-sm text-slate-500 mb-3">{question.situation}</p>

      <div className="mb-6">
        <AudioPlayer src={question.audioUrl} label="音声を聞く" />
      </div>

      <p className="text-base font-medium mb-4">何と言っていますか?</p>

      <div className="space-y-3 mb-6">
        {question.choices.map((choice, i) => {
          let style = 'border-slate-200 bg-white';
          if (showResult) {
            if (i === question.correctIndex) style = 'border-green-600 bg-green-50';
            else if (i === selectedIndex) style = 'border-red-600 bg-red-50';
          } else if (i === selectedIndex) {
            style = 'border-blue-500 bg-blue-50';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${style}`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'}`}
          >
            <p className="font-bold mb-1">{isCorrect ? '正解!' : '不正解'}</p>
            <p className="text-sm">{question.explanation}</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm text-slate-500 mb-2">音声変化のポイント</p>
            {question.soundChanges.map((sc, i) => (
              <p key={i} className="text-sm mb-1">
                <span className="font-medium">{sc.position}</span> → {sc.explanation}
              </p>
            ))}
            <div className="mt-3">
              <AudioPlayer src={question.audioUrl} label="もう一度聞く" />
            </div>
          </div>

          <VoiceRecorder expectedSentence={question.sentence} />

          <button
            onClick={onNext}
            className="w-full py-4 bg-blue-500 text-white rounded-2xl text-lg font-medium active:scale-95 transition-transform"
          >
            次へ
          </button>
        </div>
      )}
    </div>
  );
}
