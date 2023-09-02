import styles from './styles.module.css'
import classnames from 'classnames'

export function ButtonGradient({text, className, func}) {
    return <button type="button" className={classnames(styles.button, styles.button_gradient, className)} onClick={func}>{text}</button>
}