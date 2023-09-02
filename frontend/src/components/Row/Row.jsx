import styles from './styles.module.css'
import classnames from 'classnames'
import { Score } from '../Score/Score'
import { Link } from 'react-router-dom'

export function Row({index, data}) {
    return (
        <tr className={styles.table__row}>
            <td className={styles.td}>{index}</td>
            {
                data.map((item, key) => (
                    key >= 1 ? <td key={key} className={styles.td}>{item}</td> : ""
                ))
            }
        </tr>
    )
}