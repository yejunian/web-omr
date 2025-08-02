import React, { useState } from "react";
import clsx from "clsx";

import { useOmrStore } from "@/store/omr";

import styles from "./index.module.css";

function Settings() {
  const { questionCount, optionCount, setOmrSettings } = useOmrStore(
    (state) => state,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [editingQuestionCount, setEditingQuestionCount] = useState(
    questionCount.toFixed(0),
  );
  const [editingOptionCount, setEditingOptionCount] = useState(
    optionCount.toFixed(0),
  );

  const handleToggleClick = () => {
    const nextOpen = !isOpen;

    if (nextOpen) {
      setEditingQuestionCount(questionCount.toFixed(0));
      setEditingOptionCount(optionCount.toFixed(0));
    }

    setIsOpen(nextOpen);
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
        onClick={handleToggleClick}
      >
        설정
      </button>

      {isOpen ? (
        <div className={styles.content}>
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
