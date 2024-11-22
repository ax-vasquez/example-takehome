import { Workflow } from "@/constants/types";

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
    },
    2: {
        entry_point: 'hello_input',
        tasks: {
            hello_input: {
                output: 'hello @{name}!'
            }
        }
    },
    3: {
        entry_point: 'slow_goodbye',
        tasks: {
            slow_goodbye: {
                steps: [
                    {
                        wait: 5
                    }
                ],
                output: 'goodbye!'
            }
        }
    },
    4: {
        entry_point: 'join',
        tasks: {
            slow_goodbye: {
                steps: [
                    {
                        wait: 5
                    }
                ],
                output: 'goodbye'
            },
            slow_name: {
                steps: [
                    {
                        wait: 5
                    }
                ],
                output: 'Ada'
            },
            join: {
                output: '${slow_goodbye} ${slow_name}!'
            }
        }
    }
}
