import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export function Chart({percent, text}) {
    const [start, setStart] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            if (start < percent) {
                setStart(start + 1)
            }
        }, 10)
    }, [start])

    return (
        <div className={styles.progress}>
            <div className={styles.progress__circle} style={{background: `conic-gradient(#44FF8F ${3.6 * start}deg, #F8F8F8 0deg)`}}>
                <h3 className={styles.progress__value}>{start}%</h3>
            </div>
            <p className={styles.progress__text}>{text}</p>
        </div>
    )
}