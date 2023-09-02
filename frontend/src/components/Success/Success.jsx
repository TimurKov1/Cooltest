import styles from './styles.module.css'
import checkmark from '../../public/checkmark.svg'

export function Success({text}) {
    return (
        <>
            <div className={styles.shadow}></div>
            <div className={styles.success}>
                <img src={checkmark} className={styles.success__image} alt="Успех"/>
                <h2 className={styles.success__text}>{text}</h2>
            </div>
        </>
    )
}