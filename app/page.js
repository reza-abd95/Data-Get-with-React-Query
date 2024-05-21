import styles from "./page.module.css";
import Posts from "./posts/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <Posts/>
    </main>
  );
}
