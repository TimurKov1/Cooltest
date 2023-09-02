import styles from './styles.module.css'
import classnames from 'classnames'

export function Mark({mark}) {
    return (
        <div className={classnames(styles.card__circle, mark === 5 ? styles.border_green : mark === 4 ? styles.border_blue : mark === 3 ? styles.border_yellow : styles.border_red)}>
            <h3 className={classnames(styles.card__mark, mark === 5 ? styles.green : mark === 4 ? styles.blue : mark === 3 ? styles.yellow : styles.red)}>{mark}</h3>
        </div>
    )
}