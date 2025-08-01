import styles from "./index.module.css";
import QuestionRow from "./QuestionRow";

type Props = {
  length: number;
  optionSize: number;
};

function Questions({ length, optionSize }: Props) {
  return (
    <div className={styles.question}>
      {Array.from({ length }).map((_, index) => (
        <QuestionRow key={index + 1} optionSize={optionSize}>
          {index + 1}
        </QuestionRow>
      ))}
    </div>
  );
}

export default Questions;
