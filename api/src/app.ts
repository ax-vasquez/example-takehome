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
    tasks,
    input
  } = req.body

  const reduceTask = (task: WorkflowTask): string => {

    const embeddedTaskRegexp = new RegExp(/\$\{(?:\w+)+\}/, 'g')
    const embeddedStepResult = task.output.matchAll(embeddedTaskRegexp)
    const nextStep = [...embeddedStepResult][0]
    if (nextStep !== undefined) {
      const s = nextStep.toString().replace('${', '').replace('}', '')
      return task.output.replace(nextStep.toString(), reduceTask(tasks[s]))
    }

    const embeddedInputParamRegexp = new RegExp(/\@\{(?:\w+)+\}/, 'g')
    const embeddedInputParamResult = task.output.matchAll(embeddedInputParamRegexp)
    const inputParam = [...embeddedInputParamResult][0]
    if (inputParam !== undefined && input) {
      const s = inputParam.toString().replace('@{', '').replace('}', '')
      return task.output.replace(inputParam.toString(), input[s])
    }
    
    return task.output
  }

  res.json(reduceTask(tasks[entry_point]))
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
