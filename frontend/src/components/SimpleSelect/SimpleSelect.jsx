import styles from './styles.module.css'
import classnames from 'classnames'

export function SimpleSelect({className, values, func}) {
    return (
        <select className={styles.select} onChange={e => func(e.target.value)}>
            {
                Object.keys(values).map((item, key) => 
                    <option value={item} key={key}>{values[item]}</option>
                )
            }
        </select>
    )
}