import styles from './styles.module.css'
import classnames from 'classnames'

export function Button({text, className, func}) {
    return <button type="button" className={classnames(styles.button, className)} onClick={func}>{text}</button>
}