import { create } from "zustand";

import { createSelectors } from "./createSelectors";

const useOmrStoreBase = create<OmrState>()((set, get) => ({
  questionCount: 45,
  optionCount: 5,

  answers: new Map(),

  setOmrSettings: (settings) => {
    const { questionCount, optionCount } = settings;
    const nextSettings: Partial<OmrSettingsState> = {};

    if (
      questionCount &&
      !Number.isNaN(questionCount) &&
      questionCount > 0 &&
      questionCount <= 200
    ) {
      nextSettings.questionCount = questionCount;
    }

    if (
      optionCount &&
      !Number.isNaN(optionCount) &&
      optionCount >= 2 &&
      optionCount <= 5
    ) {
      nextSettings.optionCount = optionCount;
    }

    set(nextSettings);
  },

  setAnswer: (question: number, answer: number | undefined) => {
    const nextAnswers = new Map(get().answers);

    if (typeof answer === "number") {
      nextAnswers.set(question, answer);
    } else {
      nextAnswers.delete(question);
    }

    set({ answers: nextAnswers });
  },

  resetAnswer: () => {
    set({ answers: new Map() });
  },
}));

export const useOmrStore = createSelectors(useOmrStoreBase);

type OmrState = OmrSettingsState &
  OmrSettingsSetter &
  OmrAnswersState &
  OmrAnswersSetter;

type OmrSettingsState = {
  questionCount: number;
  optionCount: number;
};
type OmrSettingsSetter = {
  setOmrSettings: (settings: Partial<OmrSettingsState>) => void;
};

type OmrAnswersState = {
  answers: Map<number, number>;
};
type OmrAnswersSetter = {
  setAnswer: (question: number, answer: number | undefined) => void;
  resetAnswer: () => void;
};
