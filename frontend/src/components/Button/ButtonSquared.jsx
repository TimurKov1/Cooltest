import styles from './styles.module.css'
import classnames from 'classnames'

export function ButtonSquared({text, className, func}) {
    return <button type="button" className={classnames(styles.button, styles.button_squared, className)} onClick={func}>{text}</button>
}