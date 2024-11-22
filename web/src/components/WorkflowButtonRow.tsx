"use client"
import React, { useState } from 'react'
import styles from './WorkflowButtonRow.module.css'
import XCircle from '../../public/bootstrap-bi-x-circle.svg'
import Image from 'next/image'
import { WORKFLOWS } from '@/constants/workflows'

interface WorkflowButtonRow {
    step: | 0 | 1 | 2 | 3
}

export const WorkflowButtonRow: React.FC<WorkflowButtonRow> = ({
    step
}) => {

    const [output, setOutput] = useState<string | null>()
    const [input, setInput] = useState<string>('')
    const [fetching, setFetching] = useState(false)

    const onClickHandler = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setFetching(true)
        fetch("http://localhost:3001/workflow", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...WORKFLOWS[step],
                input: (step === 2 && input.length > 0) ? {
                    name: input
                } : undefined
            })
        })
        .then(res => res.json())
        .then(res => {
            setOutput(res)
        })
        .catch(e => {
            setOutput(`ERROR: ${e.message}`)
        })
        .finally(() => {
            setFetching(false)
        })
    }

    return (
        <div className={styles.container}>
            <button disabled={fetching} onClick={onClickHandler}>{`Step ${step}`}</button>
            {step === 2 && <input className={styles.input} value={input} placeholder='name' onChange={(e) => setInput(e.target.value)} />}
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
