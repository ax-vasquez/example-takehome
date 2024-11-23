
/**
 * An independent step of the Workflow (a Workflow is made up of one, or many tasks)
 */
export type WorkflowTask = {
    /**
     * The output (a.k.a. "result") of the given step; this can include placeholders for values that are outputs from other
     * steps in the same workflow.
     * 
     * If no output key is given for a task, the result of the task is the result of its final step.
     */
    output?: string,
    /**
     * Steps for this WorkflowTask; A string of ${0} is a placeholder for the result of the previous step in the task
     */
    steps?: {
        /**
         * Wait an arbitrary amount of time (in seconds)
         */
        wait?: number
        /**
         * Return the length of the given input argument
         */
        length?: string
        /**
         * Greater-than; compares the first number with the second (returns true if first argument is greater than the second)
         */
        gt?: string[]
        /**
         * Evaluate the 
         */
        if?: {
            condition: string
            true: string
            false: string
        }
    }[]
}

export type Workflow = {
    /**
     * The task that the given workflow should start with
     */
	entry_point: string
    /**
     * Key-value pairs for each independent task; together these tasks make up the whole workflow
     */
	tasks: {
		[task: string]: WorkflowTask
	}
    /**
     * Optional key-value pair object containing one, or more inputs
     */
    input?: {
        [i: string]: string
    }
}
