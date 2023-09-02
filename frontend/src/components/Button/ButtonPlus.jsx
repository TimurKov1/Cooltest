import styles from './styles.module.css'
import plus from '../../public/plus.svg'

export function ButtonPlus({func, answers, component}) {
    return (
        <button className={styles.button_plus} onClick={() => func([...answers, {text: '', isRight: false}])}>
            <img src={plus} alt="+" className={styles.plus}/>
        </button>
    )
}