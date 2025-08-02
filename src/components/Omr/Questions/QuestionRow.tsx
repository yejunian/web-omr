import { useOmrStore } from "@/store/omr";

import QuestionOption from "./QuestionOption";
import styles from "./QuestionRow.module.css";

type Props = {
  questionNumber: number;
};

function QuestionRow({ questionNumber }: Props) {
  const optionCount = useOmrStore.use.optionCount();
  const answers = useOmrStore.use.answers();
  const setAnswer = useOmrStore.use.setAnswer();

  const handleCheckedChangeWith =
    (optionNumber: number) => (checked: boolean) => {
      if (checked) {
        setAnswer(questionNumber, optionNumber);
      } else {
        setAnswer(questionNumber, undefined);
      }
    };

  return (
    <div className={styles.row}>
      <div className={styles.number}>{questionNumber}</div>
      {Array.from({ length: optionCount }, (_, index) => (
        <QuestionOption
          key={index + 1}
          checked={answers.get(questionNumber) === index + 1}
          onCheckedChange={handleCheckedChangeWith(index + 1)}
        >
          {index + 1}
        </QuestionOption>
      ))}
    </div>
  );
}

export default QuestionRow;
