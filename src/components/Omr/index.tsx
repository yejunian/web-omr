import styles from "./index.module.css";
import Questions from "./Questions";

function Omr() {
  return (
    <section className={styles.omr}>
      <div className={styles.header}>
        <div>문번</div>
        <div>답란</div>
      </div>

      <Questions />
    </section>
  );
}

export default Omr;
