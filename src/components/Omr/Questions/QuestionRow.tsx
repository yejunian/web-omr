import { useOmrStore } from "@/store/omr";

import QuestionOption from "./QuestionOption";
import styles from "./QuestionRow.module.css";

type Props = {
  children: React.ReactNode;
  answer?: number | undefined;
  onAnswerChange?: (answer: number | undefined) => void;
};

function QuestionRow({ children, answer, onAnswerChange }: Props) {
  const optionCount = useOmrStore((state) => state.optionCount);

  const handleCheckedChangeWith = (optionNumber: number) => {
    if (!onAnswerChange) {
      return undefined;
    }

    return (checked: boolean) => {
      if (checked) {
        onAnswerChange(optionNumber);
      } else {
        onAnswerChange(undefined);
      }
    };
  };

  return (
    <div className={styles.row}>
      <div className={styles.number}>{children}</div>
      {Array.from({ length: optionCount }, (_, index) => (
        <QuestionOption
          key={index + 1}
          checked={answer === index + 1}
          onCheckedChange={handleCheckedChangeWith(index + 1)}
        >
          {index + 1}
        </QuestionOption>
      ))}
    </div>
  );
}

export default QuestionRow;
