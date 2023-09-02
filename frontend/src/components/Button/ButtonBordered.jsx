import styles from './styles.module.css'
import classnames from 'classnames'

export function ButtonBordered({text, className, func}) {
    return <button type="button" className={classnames(styles.button, styles.button_bordered, className)} onClick={func}>{text}</button>
}