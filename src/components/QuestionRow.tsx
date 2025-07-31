import QuestionOption from "./QuestionOption";
import styles from "./QuestionRow.module.css";

type Props = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

function QuestionRow({ children }: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.question}>{children}</div>
      <QuestionOption>1</QuestionOption>
      <QuestionOption>2</QuestionOption>
      <QuestionOption>3</QuestionOption>
      <QuestionOption>4</QuestionOption>
      <QuestionOption>5</QuestionOption>
    </div>
  );
}

export default QuestionRow;
