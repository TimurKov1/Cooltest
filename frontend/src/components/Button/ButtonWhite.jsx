import styles from './styles.module.css'
import classnames from 'classnames'

export function ButtonWhite({text, className, func}) {
    return <button type="button" className={classnames(styles.button, styles.button_white, className)} onClick={func}>{text}</button>
}