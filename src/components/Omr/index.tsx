import styles from "./index.module.css";
import Questions from "./Questions";

function Omr() {
  return (
    <div className={styles.omr}>
      <div className={styles.header}>
        <div>문번</div>
        <div>답란</div>
      </div>

      <Questions length={45} optionSize={5} />
    </div>
  );
}

export default Omr;
