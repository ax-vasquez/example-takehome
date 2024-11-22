import { Workflow } from "@/components/types";

export const WORKFLOWS: { [step: number]: Workflow } = {
    0: {
        entry_point: 'hello_world',
        tasks: {
            hello_world: {
                output: 'hello world!'
            }
        }
    },
    1: {
        entry_point: 'hello_name',
        tasks: {
            name: {
                output: 'Alan'
            },
            hello_name: {
                output: 'hello ${name}!'
            }
        }
    }
}
