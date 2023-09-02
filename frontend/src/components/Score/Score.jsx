import styles from './styles.module.css'
import classnames from 'classnames'

export function Score({value, text, className}) {
    return (
        <h3 className={classnames(styles.score, className, value > 4.7 ? styles.green : value > 3.7 ? styles.blue : value > 2.5 ? styles.yellow : styles.red)}>{text} {value}</h3>
    )
}