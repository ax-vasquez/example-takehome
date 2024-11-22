import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Workflow, WorkflowTask } from "./types";
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());

app.post("/workflow", (req: Request<any, any, Workflow>, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  const {
    entry_point,
    tasks
  } = req.body

  const reduceTask = (task: WorkflowTask) => {
    // TODO: Way to extract embedded tasks - if an embedded task exists, call this again (recursive)
  }

  res.json(entry_point)
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
