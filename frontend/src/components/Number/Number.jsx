import styles from './styles.module.css'
import classnames from 'classnames'

export function Number({index}) {
    return (
        <div className={styles.circle}>
            <h3 className={styles.mark}>{index}</h3>
        </div>
    )
}