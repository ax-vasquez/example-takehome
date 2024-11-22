"use client"
import React, { useState } from 'react'
import styles from './WorkflowButtonRow.module.css'
import XCircle from '../../public/bootstrap-bi-x-circle.svg'
import Image from 'next/image'
import { WORKFLOWS } from '@/constants/workflows'

interface WorkflowButtonRow {
    step: | 0 | 1 
}

export const WorkflowButtonRow: React.FC<WorkflowButtonRow> = ({
    step
}) => {

    const [output, setOutput] = useState<string | null>()

    const onClickHandler = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        fetch("http://localhost:3001/workflow", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(WORKFLOWS[step])
        })
        .then(res => res.json())
        .then(res => {
            setOutput(res)
        })
        .catch(e => {
            setOutput(`ERROR: ${e.message}`)
        }) 
    }

    return (
        <div className={styles.container}>
            <button onClick={onClickHandler}>{`Step ${step}`}</button>
            <p className={styles.output}>{output}</p>
            {output && (
                <button title='clear' className={styles.clearTextBtn} onClick={() => setOutput(null)}>
                    <Image
                        priority
                        src={XCircle}
                        alt="clear"
                    />
                </button>)
            }
        </div>
    )
}
