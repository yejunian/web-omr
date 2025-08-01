import QuestionOption from "./QuestionOption";
import styles from "./QuestionRow.module.css";

type Props = {
  children: React.ReactNode;
  optionSize: number;
};

function QuestionRow({ children, optionSize }: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.number}>{children}</div>
      {Array.from({ length: optionSize }, (_, index) => (
        <QuestionOption key={index + 1}>{index + 1}</QuestionOption>
      ))}
    </div>
  );
}

export default QuestionRow;
