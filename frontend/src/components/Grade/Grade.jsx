import classnames from 'classnames'
import { useState } from 'react'
import { render } from 'react-dom'
import styles from './styles.module.css'

export function Grade({id, name, activeGrades, setActiveGrades}) {
    const [active, setActive] = useState(1)

    return (
        <button className={classnames(styles.grades__button, !active ? styles.grades__button_active : '')} onClick={() => {
            setActive((active + 1) % 2)
            if (active) {
                const newGrades = activeGrades
                newGrades.push(id)
                setActiveGrades([...newGrades])
            } else {
                const newGrades = activeGrades
                newGrades.splice(newGrades.indexOf(id), 1)
                setActiveGrades([...newGrades])
            }
        }}>{name}</button>
    )
} 