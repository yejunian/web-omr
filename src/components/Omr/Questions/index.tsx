import { useOmrStore } from "@/store/omr";

import styles from "./index.module.css";
import QuestionRow from "./QuestionRow";

type Props = {
  answers: Map<number, number>;
  onAnswerChange?: (question: number, answer: number | undefined) => void;
};

function Questions({ answers, onAnswerChange }: Props) {
  const questionCount = useOmrStore((state) => state.questionCount);

  const handleAnswerChangeWith = (questionNumber: number) => {
    if (!onAnswerChange) {
      return undefined;
    }

    return (answer: number | undefined) => {
      onAnswerChange(questionNumber, answer);
    };
  };

  return (
    <div className={styles.question}>
      {Array.from({ length: questionCount }).map((_, index) => (
        <QuestionRow
          key={index + 1}
          answer={answers.get(index + 1)}
          onAnswerChange={handleAnswerChangeWith(index + 1)}
        >
          {index + 1}
        </QuestionRow>
      ))}
    </div>
  );
}

export default Questions;
