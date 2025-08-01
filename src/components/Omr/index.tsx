import { useState } from "react";

import styles from "./index.module.css";
import Questions from "./Questions";

function Omr() {
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());

  const handleAnswerChange = (question: number, answer: number | undefined) => {
    const nextAnswers = new Map(answers);
    if (typeof answer === "number") {
      nextAnswers.set(question, answer);
    } else {
      nextAnswers.delete(question);
    }

    setAnswers(nextAnswers);
  };

  return (
    <div className={styles.omr}>
      <div className={styles.header}>
        <div>문번</div>
        <div>답란</div>
      </div>

      <Questions
        length={45}
        optionSize={5}
        answers={answers}
        onAnswerChange={handleAnswerChange}
      />
    </div>
  );
}

export default Omr;
