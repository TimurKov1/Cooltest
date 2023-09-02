import styles from './styles.module.css'
import classnames from 'classnames'

export function ButtonViolent({text, className, func}) {
    return <button type="button" className={classnames(styles.button, styles.button_violent, className)} onClick={func}>{text}</button>
}