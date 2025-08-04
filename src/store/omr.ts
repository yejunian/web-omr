import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOmrStore = create<OmrState>()(
  persist(
    (set, get) => ({
      questionCount: 45,
      optionCount: 5,

      answers: {},

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
        const nextAnswers = { ...get().answers };

        if (typeof answer === "number") {
          nextAnswers[question] = answer;
        } else {
          delete nextAnswers[question];
        }

        set({ answers: nextAnswers });
      },

      resetAnswer: () => {
        set({ answers: {} });
      },
    }),
    {
      name: "web-omr--omr",
    },
  ),
);

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
  answers: { [question: number]: number | undefined };
};
type OmrAnswersSetter = {
  setAnswer: (question: number, answer: number | undefined) => void;
  resetAnswer: () => void;
};
