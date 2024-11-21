
export type Workflow = {
    /**
     * The task that the given workflow should start with
     */
	entry_point: string
    /**
     * Key-value pairs for each independent task; together these tasks make up the whole workflow
     */
	tasks: {
        /**
         * A task is an independent step of the workflow
         */
		[task: string]: {
            /**
             * The output (a.k.a. "result") of the given step; this can include placeholders for values that are outputs from other
             * steps in the same workflow.
             */
			output: string,
			steps?: {
				wait: number
			}[]
		}
	}
}
