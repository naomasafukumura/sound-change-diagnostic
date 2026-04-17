export type SoundChangeCategory = 'linking' | 'elision' | 'weakForm';

export interface SoundChange {
  position: string;
  explanation: string;
}

export interface Question {
  id: number;
  category: SoundChangeCategory;
  sentence: string;
  translation: string;
  situation: string;
  soundChanges: SoundChange[];
  audioUrl: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface CategoryIntro {
  category: SoundChangeCategory;
  title: string;
  subtitle: string;
  description: string;
  demoAudioUrl: string;
  demoSentence: string;
  demoExplanation: string;
}

export interface CategoryScore {
  correct: number;
  total: number;
}

export interface DiagnosticResult {
  scores: Record<SoundChangeCategory, CategoryScore>;
  weakestCategory: SoundChangeCategory;
  comment: string;
}

export interface QuizAnswer {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
}
