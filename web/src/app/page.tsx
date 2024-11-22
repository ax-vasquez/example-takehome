import { WorkflowButtonRow } from "@/components/WorkflowButtonRow";
import styles from "./page.module.css";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Workflow Buttons</h1>
        <p className={styles.descriptionText}>Each button is labeled for the step in the task that it corresponds to.</p>
        <div>
          <WorkflowButtonRow 
            step={0}
          />
        </div>
      </main>
    </div>
  );
}
