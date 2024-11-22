import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Workflow, WorkflowTask } from "./types";
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());

app.post("/workflow", async (req: Request<any, any, Workflow>, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  const {
    entry_point,
    tasks,
    input
  } = req.body

  const reduceTask = async (task: WorkflowTask): Promise<string> => {

    if (task.steps) {
      await Promise.all(
        task.steps.map(async step => {
          await new Promise(r => setTimeout(r, (step.wait * 1000)))
        })
      )
    }

    const embeddedTaskRegexp = new RegExp(/\$\{(?:\w+)+\}/, 'g')
    const embeddedStepResult = task.output.matchAll(embeddedTaskRegexp)
    const nextSteps = [...embeddedStepResult]
    if (nextSteps.length > 0) {
      await Promise.all(
        nextSteps.map(async step => {
          const s = step.toString().replace('${', '').replace('}', '')
          const result = await reduceTask(tasks[s])
          task.output = task.output.replace(step.toString(), result)
        })
      )
      return task.output
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

  res.json(await reduceTask(tasks[entry_point]))
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
