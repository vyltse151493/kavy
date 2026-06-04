export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  timeLeft: number;
  answered: boolean;
  answers: (number | null)[];
  quizStarted: boolean;
  quizEnded: boolean;
}
