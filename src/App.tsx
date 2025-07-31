import styles from "./App.module.css";
import QuestionOption from "./components/QuestionOption";

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
            <div key={index + 1} className={styles.row}>
              <div className={styles.question}>{index + 1}</div>
              <QuestionOption>1</QuestionOption>
              <QuestionOption>2</QuestionOption>
              <QuestionOption>3</QuestionOption>
              <QuestionOption>4</QuestionOption>
              <QuestionOption>5</QuestionOption>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
