import { useCallback, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { ButtonGradient } from '../Button/ButtonGradient'
import styles from './styles.module.css'

export function Start({id, time, count, func}) {
    const auth = useContext(AuthContext)
    const {loading, error, request} = useHttp()

    async function startTest() {
        func(true)
        const query = await request('/api/test/start', 'POST', {userId: auth.userId, testId: id, duration: parseInt(time) * 60})
    }

    return (
        <div className={styles.start}>
            <div className={styles.start__group}>
                <h3 className={styles.start__info}>Время: <span className={styles.purple}>{time} минут</span></h3>
                <h3 className={styles.start__info}>Кол-во вопросов: <span className={styles.purple}>{count}</span></h3>
            </div>
            <ButtonGradient text="Начать тест" func={() => startTest()}/>
        </div>
    )
}