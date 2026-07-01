import { create } from "zustand";
import { QUESTIONS } from "@/data/questions";
import { evaluate, type AnswerMap } from "@/lib/matching";
import type { PersonalityProfile, Recommendation } from "@/data/types";

interface QuizState {
  current: number; // 当前题目下标
  answers: AnswerMap; // 每题选中的选项下标
  profile: PersonalityProfile | null;
  recommendations: Recommendation[];
  // actions
  select: (optionIdx: number) => void;
  next: () => void;
  prev: () => void;
  goTo: (idx: number) => void;
  reset: () => void;
  compute: () => void;
}

const TOTAL = QUESTIONS.length;

const initialAnswers = (): AnswerMap => Array(TOTAL).fill(-1);

export const useQuizStore = create<QuizState>((set, get) => ({
  current: 0,
  answers: initialAnswers(),
  profile: null,
  recommendations: [],

  select: (optionIdx) => {
    const { current, answers } = get();
    const next = [...answers];
    next[current] = optionIdx;
    set({ answers: next });
  },

  next: () => {
    const { current } = get();
    if (current < TOTAL - 1) set({ current: current + 1 });
  },

  prev: () => {
    const { current } = get();
    if (current > 0) set({ current: current - 1 });
  },

  goTo: (idx) => {
    if (idx >= 0 && idx < TOTAL) set({ current: idx });
  },

  reset: () =>
    set({
      current: 0,
      answers: initialAnswers(),
      profile: null,
      recommendations: [],
    }),

  compute: () => {
    const { answers } = get();
    const { profile, recommendations } = evaluate(answers);
    set({ profile, recommendations });
  },
}));
