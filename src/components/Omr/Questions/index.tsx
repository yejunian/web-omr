import styles from "./index.module.css";
import QuestionRow from "./QuestionRow";

type Props = {
  length: number;
  optionSize: number;
  answers: Map<number, number>;
  onAnswerChange?: (question: number, answer: number | undefined) => void;
};

function Questions({ length, optionSize, answers, onAnswerChange }: Props) {
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
      {Array.from({ length }).map((_, index) => (
        <QuestionRow
          key={index + 1}
          optionSize={optionSize}
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
