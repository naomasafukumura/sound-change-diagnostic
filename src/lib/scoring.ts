import { questions } from '../data/questions';
import { QuizAnswer, DiagnosticResult, SoundChangeCategory, CategoryScore } from '../data/types';

const categoryComments: Record<SoundChangeCategory, string> = {
  linking:
    '単語と単語の繋がりに注目してみましょう。音が繋がるパターンを知るだけで、リスニング力が一気に上がります。',
  elision:
    '消える音に気づけると、ネイティブのスピードについていけるようになります。特にt, dの音に注目です。',
  weakForm:
    '機能語（can, to, forなど）が弱く発音されるパターンを覚えると、聞き取りの精度が大きく変わります。',
};

const allCorrectComment =
  '知識はバッチリです。次は実際に自分の口で再現できるかが鍵です。音声変化を意識しながら声に出す練習を続けていきましょう。';

export function calculateResult(answers: QuizAnswer[]): DiagnosticResult {
  const scores: Record<SoundChangeCategory, CategoryScore> = {
    linking: { correct: 0, total: 0 },
    elision: { correct: 0, total: 0 },
    weakForm: { correct: 0, total: 0 },
  };

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) continue;
    scores[question.category].total++;
    if (answer.isCorrect) {
      scores[question.category].correct++;
    }
  }

  const totalCorrect = Object.values(scores).reduce((sum, s) => sum + s.correct, 0);
  const totalQuestions = Object.values(scores).reduce((sum, s) => sum + s.total, 0);

  if (totalCorrect === totalQuestions) {
    return { scores, weakestCategory: 'linking', comment: allCorrectComment };
  }

  const categoryOrder: SoundChangeCategory[] = ['linking', 'elision', 'weakForm'];
  let weakest: SoundChangeCategory = 'linking';
  let lowestRate = 1;

  for (const cat of categoryOrder) {
    const s = scores[cat];
    const rate = s.total > 0 ? s.correct / s.total : 1;
    if (rate < lowestRate) {
      lowestRate = rate;
      weakest = cat;
    }
  }

  return {
    scores,
    weakestCategory: weakest,
    comment: categoryComments[weakest],
  };
}
