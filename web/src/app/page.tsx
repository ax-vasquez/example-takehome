import { WorkflowButtonRow } from "@/components/WorkflowButtonRow";
import styles from "./page.module.css";
import { WorkflowDropdown } from "@/components/WorkflowDropdown";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Workflow Testing</h1>
        <p className={styles.descriptionText}>Each option is labeled for the "entry_point" that the corresponding workflow starts with.</p>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: '1rem'
        }}>
          <WorkflowDropdown />
        </div>
      </main>
    </div>
  );
}
