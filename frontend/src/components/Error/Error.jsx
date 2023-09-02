import styles from './styles.module.css'
import cross from '../../public/cross.svg'
import { useState } from 'react'

export function Error({text}) {
    const [hide, setHide] = useState(false)

    return (
        <>
            {
                !hide ? 
                    <div className={styles.error}>
                        <div className={styles.shadow} onClick={() => setHide(true)}></div>
                        <div className={styles.error__body}>
                            <img src={cross} className={styles.error__image} alt="Ошибка"/>
                            <h2 className={styles.error__text}>{text}</h2>
                        </div>
                    </div>
                : ''
            }
        </>
    )
}