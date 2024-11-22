"use client"
import React, { useState } from 'react'
import styles from './WorkflowDropdown.module.css'
import { WORKFLOWS } from '@/constants/workflows'
import { WorkflowButtonRow } from './WorkflowButtonRow'

interface WorkflowDropdownProps {

}

export const WorkflowDropdown: React.FC<WorkflowDropdownProps> = () => {

    const [worflow, setWorkflow] = useState<number>(0)

    return (
        <div className={styles.container}>
            <select name="select workflow" value={worflow || "select workflow"} onChange={(e) =>  setWorkflow(parseInt(e.target.value))} className={styles.dropdownBar}>
                {Object.keys(WORKFLOWS).map((key) => {
                    const {
                        entry_point
                    } = WORKFLOWS[parseInt(key)]
                    return (
                        <option
                            key={`workflow-${key}`}
                            value={key}
                        >
                            {entry_point}
                        </option>
                    )
                })}
            </select>
            <WorkflowButtonRow 
                workflow={worflow}
            />
        </div>
    )
}
