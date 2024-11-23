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

  const inputMappings: {
    [s: string]: string
  } = {}

  const reduceTask = async (task: WorkflowTask): Promise<string> => {

    if (task.steps) {
      await Promise.all(
        task.steps.map(async (step) => {
          if (step.wait) {
            await new Promise(r => {
              if (step.wait) {
                return setTimeout(r, (step.wait * 1000))
              }
              return
            })
          }
        })
      )
    }

    if (task.output) {
      const embeddedInputParamRegexp = new RegExp(/\@\{(?:\w+)+\}/, 'g')
      const embeddedInputParamResult = task.output.matchAll(embeddedInputParamRegexp)
      const inputParam = [...embeddedInputParamResult][0]
      if (inputParam !== undefined && input) {
        const s = inputParam.toString().replace('@{', '').replace('}', '')
        inputMappings[inputParam.toString()] = s
        task.output = task.output.replace(inputParam.toString(), input[s])
      }

      const embeddedTaskRegexp = new RegExp(/\$\{(?:\w+)+\}/, 'g')
      const embeddedStepResult = task.output.matchAll(embeddedTaskRegexp)
      const nextSteps = [...embeddedStepResult]
      if (nextSteps.length > 0) {
        await Promise.all(
          nextSteps.map(async step => {
            if (task.output) {
              const s = step.toString().replace('${', '').replace('}', '')
              const result = await reduceTask(tasks[s])
              task.output = task.output.replace(step.toString(), result)
            }
          })
        )
      }
    }

    let stepsOutput: any
    if (task.steps) {
      task.steps.forEach((step) => {
        if (step.length) {
          if (input) {
            stepsOutput = input[inputMappings[step.length]].length
          } else {
            stepsOutput = step.length.length
          }
        }
        if (step.gt) {
          step.gt[step.gt.indexOf('${0}')] = stepsOutput
          const arg1 = parseInt(step.gt[0])
          const arg2 = parseInt(step.gt[1])
          stepsOutput = arg1 > arg2
        }
        if (step.if) {
          let bool: boolean
          if (step.if.condition === '${0}') {
            bool = stepsOutput
          } else {
            bool = step.if.condition === 'true' ? true : false
          }
          if (bool) {
            stepsOutput = step.if.true
          } else {
            stepsOutput = step.if.false
          }
        }
      })
    }

    if (task.output) return task.output
    if (stepsOutput) return stepsOutput

    return ``
  }

  res.json(await reduceTask(tasks[entry_point]))
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
