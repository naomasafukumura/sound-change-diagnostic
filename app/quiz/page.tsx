'use client';

import { useState, useEffect, useMemo, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/data/questions';
import { categories } from '@/data/categories';
import { QuizAnswer, SoundChangeCategory } from '@/data/types';
import { calculateResult } from '@/lib/scoring';
import { isCompleted, markCompleted, saveResult } from '@/lib/storage';
import { ProgressBar } from '@/components/ProgressBar';
import { CategoryIntroCard } from '@/components/CategoryIntro';
import { QuizCard } from '@/components/QuizCard';

type Step =
  | { type: 'categoryIntro'; categoryIndex: number }
  | { type: 'question'; questionIndex: number };

const categoryOrder: SoundChangeCategory[] = ['linking', 'elision', 'weakForm'];

function buildSteps(): Step[] {
  const steps: Step[] = [];
  for (let ci = 0; ci < categoryOrder.length; ci++) {
    steps.push({ type: 'categoryIntro', categoryIndex: ci });
    const cat = categoryOrder[ci];
    const catQuestions = questions.filter((q) => q.category === cat);
    for (const q of catQuestions) {
      const globalIndex = questions.indexOf(q);
      steps.push({ type: 'question', questionIndex: globalIndex });
    }
  }
  return steps;
}

const subscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export default function QuizPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const steps = useMemo(() => buildSteps(), []);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  useEffect(() => {
    if (isCompleted()) {
      router.replace('/result');
    }
  }, [router]);

  if (!hydrated) return null;

  const currentStep = steps[currentStepIndex];
  const questionCount = questions.length;
  const answeredCount = answers.length;

  const currentCategoryLabel = (() => {
    if (currentStep.type === 'categoryIntro') {
      return categories[currentStep.categoryIndex].title;
    }
    const q = questions[currentStep.questionIndex];
    const cat = categories.find((c) => c.category === q.category);
    return cat?.title ?? '';
  })();

  const handleAnswer = (questionId: number, isCorrect: boolean, selectedIndex: number) => {
    setAnswers((prev) => [...prev, { questionId, selectedIndex, isCorrect }]);
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= steps.length) {
      const result = calculateResult(answers);
      markCompleted();
      saveResult(JSON.stringify(result));
      router.push('/result');
      return;
    }
    setCurrentStepIndex(nextIndex);
  };

  return (
    <div>
      <ProgressBar
        current={answeredCount}
        total={questionCount}
        categoryLabel={currentCategoryLabel}
      />

      {currentStep.type === 'categoryIntro' ? (
        <CategoryIntroCard
          category={categories[currentStep.categoryIndex]}
          onNext={handleNext}
        />
      ) : (
        <QuizCard
          key={questions[currentStep.questionIndex].id}
          question={questions[currentStep.questionIndex]}
          onAnswer={(isCorrect, selectedIndex) =>
            handleAnswer(questions[currentStep.questionIndex].id, isCorrect, selectedIndex)
          }
          onNext={handleNext}
        />
      )}
    </div>
  );
}
