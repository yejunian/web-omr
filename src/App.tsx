import styles from "./App.module.css";
import Omr from "./components/Omr";

function App() {
  return (
    <div className={styles.app}>
      <h1>웹 OMR 시뮬레이터</h1>

      <Omr />
    </div>
  );
}

export default App;
