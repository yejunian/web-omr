import { create } from "zustand";

export const useOmrStore = create<OmrState>()((set) => ({
  questionCount: 45,
  optionCount: 5,

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
}));

type OmrState = OmrSettingsState & {
  setOmrSettings: (settings: Partial<OmrSettingsState>) => void;
};

type OmrSettingsState = {
  questionCount: number;
  optionCount: number;
};
