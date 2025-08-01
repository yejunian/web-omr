import { useState } from "react";
import clsx from "clsx";

import styles from "./index.module.css";

function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleClick = () => {
    setIsOpen(!isOpen);

    // TODO: 열릴 때 초깃값 세팅
  };

  const handleCancelClick = () => {
    setIsOpen(false);
  };

  const handleApplyClick = () => {
    // TODO: 설정 적용

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
            <input id="count-questions" type="number" min={1} />
          </div>

          <div className={styles.item}>
            <label htmlFor="count-options">선택지 수 (2~5)</label>
            <input id="count-options" type="number" min={2} max={5} />
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
