import { useOmrStore } from "@/store/omr";

import styles from "./index.module.css";
import QuestionRow from "./QuestionRow";

function Questions() {
  const questionCount = useOmrStore((state) => state.questionCount);

  return (
    <div className={styles.question}>
      {Array.from({ length: questionCount }).map((_, index) => (
        <QuestionRow key={index + 1} questionNumber={index + 1} />
      ))}
    </div>
  );
}

export default Questions;
