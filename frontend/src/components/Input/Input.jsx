import styles from './styles.module.css'
import classnames from 'classnames'

export function Input({type, placeholder, name, func, className}) {
    return <input type={type} className={className ? className : styles.input} placeholder={placeholder} name={name} onChange={func}/>
}