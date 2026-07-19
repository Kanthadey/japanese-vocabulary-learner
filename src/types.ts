export interface VocabWord {
  id: string;
  japanese: string; // e.g. "わたし"
  kanji?: string;   // e.g. "私"
  romaji: string;   // e.g. "watashi"
  english: string;  // e.g. "I"
  bangla: string;   // e.g. "আমি"
  banglaPhonetic?: string; // e.g. "ওয়াতাশি"
  lessonId?: string; // e.g. "lesson-1"
}

export interface GrammarRule {
  title: string;
  formula: string; // e.g. "N1 + は + N2 + です"
  explanation: string; // Explanation in English/Bengali
  examples: {
    japanese: string;
    english: string;
    bangla: string;
  }[];
}

export interface Lesson {
  id: string;
  title: string;
  japaneseTitle: string;
  level: "N5" | "N4" | "Basics";
  description: string;
  vocab: VocabWord[];
  grammar: GrammarRule[];
}

export interface SRSState {
  vocabId: string;
  easiness: number; // default 2.5
  interval: number; // days
  repetition: number; // consecutive correct reviews
  dueDate: string; // ISO string
  lastReviewed?: string; // ISO string
}

export interface UserProgress {
  srsData: { [vocabId: string]: SRSState };
  learnedVocabIds: string[];
  streak: number;
  lastStudyDate?: string;
  dailyGoal: number; // number of cards to review/learn per day
  completedTodayCount: number;
}

export interface QuizQuestion {
  id: string;
  question: string; // e.g. "くつに 石 が 入っていました。" (with underlined word / context)
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  level: "N5" | "N4";
  questions: QuizQuestion[];
}
