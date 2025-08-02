import React, { useState } from "react";
import clsx from "clsx";

import { useOmrStore } from "@/store/omr";

import styles from "./index.module.css";

function Settings() {
  const questionCount = useOmrStore.use.questionCount();
  const optionCount = useOmrStore.use.optionCount();
  const setOmrSettings = useOmrStore.use.setOmrSettings();
  const resetAnswer = useOmrStore.use.resetAnswer();

  const [isOpen, setIsOpen] = useState(false);
  const [willReset, setWillReset] = useState(false);
  const [editingQuestionCount, setEditingQuestionCount] = useState(
    questionCount.toFixed(0),
  );
  const [editingOptionCount, setEditingOptionCount] = useState(
    optionCount.toFixed(0),
  );

  const handleSettingsToggle = () => {
    const nextIsOpen = !isOpen;

    if (nextIsOpen) {
      setWillReset(false);
      setEditingQuestionCount(questionCount.toFixed(0));
      setEditingOptionCount(optionCount.toFixed(0));
    }

    setIsOpen(nextIsOpen);
  };

  const handleResetToggle = () => {
    setWillReset(!willReset);
  };

  const handleChangeWith =
    (dispatch: (nextValue: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(event.target.value);
    };

  const handleCancelClick = () => {
    setIsOpen(false);
  };

  const handleApplyClick = () => {
    if (willReset) {
      const willResetConfirm = confirm("입력한 응답을 모두 초기화합니다.");

      if (willResetConfirm) {
        resetAnswer();
      } else {
        return;
      }
    }

    setOmrSettings({
      questionCount: parseInt(editingQuestionCount, 10),
      optionCount: parseInt(editingOptionCount, 10),
    });

    setIsOpen(false);
  };

  return (
    <section className={styles.settings}>
      <button
        className={clsx(styles.toggle, isOpen && styles.checked)}
        onClick={handleSettingsToggle}
      >
        설정
      </button>

      {isOpen ? (
        <div className={styles.content}>
          <div className={styles.item}>
            <label htmlFor="count-questions">응답 비우기</label>
            <button
              className={clsx(styles.toggle, willReset && styles.checked)}
              onClick={handleResetToggle}
            >
              승인
            </button>
          </div>

          <div className={styles.item}>
            <label htmlFor="count-questions">문항 수 (1~)</label>
            <input
              id="count-questions"
              type="number"
              min={1}
              value={editingQuestionCount}
              onChange={handleChangeWith(setEditingQuestionCount)}
            />
          </div>

          <div className={styles.item}>
            <label htmlFor="count-options">선택지 수 (2~5)</label>
            <input
              id="count-options"
              type="number"
              min={2}
              max={5}
              value={editingOptionCount}
              onChange={handleChangeWith(setEditingOptionCount)}
            />
          </div>

          <div className={styles.footer}>
            <button onClick={handleCancelClick}>취소</button>
            <button onClick={handleApplyClick}>적용</button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Settings;
