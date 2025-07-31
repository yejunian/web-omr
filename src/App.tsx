import styles from "./App.module.css";
import QuestionRow from "./components/QuestionRow";

function App() {
  return (
    <div className={styles.app}>
      <h1>웹 OMR 시뮬레이터</h1>

      <div className={styles.omr}>
        <div className={styles.header}>
          <div>문번</div>
          <div>답란</div>
        </div>

        <div className={styles.answer}>
          {Array.from({ length: 45 }).map((_, index) => (
            <QuestionRow>{index + 1}</QuestionRow>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
