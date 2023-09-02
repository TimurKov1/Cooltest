import styles from './styles.module.css'
import classnames from 'classnames'
import { useHttp } from '../../hooks/http.hook'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Shadow } from '../Shadow/Shadow'
import { Mark } from '../Mark/Mark'
import { QuestionsCount } from '../QuestionsCount/QuestionsCount'
import { Loading } from '../Loading/Loading'
import { Error } from '../Error/Error'
import { Link } from 'react-router-dom'
import { Timer } from '../Timer/Timer'

export function Card({className, data}) {
    const auth = useContext(AuthContext)
    const [mark, setMark] = useState(null)
    const [time, setTime] = useState(null)
    const [status, setStatus] = useState(false)
    const date = data.created_date.split('-')
    const year = date[0]
    const month = date[1]
    const day = date[2]

    const {loading, error, request, clearError} = useHttp()

    const getMark = useCallback(async () => {
        const markData = await request('/api/test/get_mark/', 'POST', {userId: auth.userId, testId: data.id})
        const test = await request('/api/test/check_test', 'POST', {userId: auth.userId, testId: data.id})
        setMark(markData)
        if (!test.status) {
            if (!test.time) {
                setStatus(false)
            } else {
                setStatus(true)
                setTime(test.time)
            }
        }
    }, [request, auth.userId, data.id])

    useEffect(() => {
        getMark()
        clearError()
    }, [getMark])

    if (loading || mark === null) {
        return <Loading className={styles.loading}/>
    }

    return (
        <>
            {
                mark.is_done ? 
                    <div className={classnames(styles.card, styles.card_disabled, className)}>
                        <Shadow/>
                        <div className={styles.card__result}>
                            <Mark mark={mark ? mark.mark : ''}/>
                            <QuestionsCount questions={[mark ? mark.questions : '', data.questions]}/>
                        </div>
                        <div className={styles.card__group}>
                            <h2 className={styles.card__name}>{data.name}</h2>
                            <h4 className={styles.card__date}>{day}.{month}.{year}</h4>
                        </div>
                    </div>
                :
                status ?
                    <Link className={styles.link} to={`/${auth.type === 'student' ? 'test' : 'result'}/${data.id}`}>
                        <div className={classnames(styles.card, className)}>
                            <Shadow/>
                            <div className={styles.card__result}>
                                <Timer id={data.id} time={data.time} count={data.questions} type="big"/>
                            </div>
                            <div className={styles.card__group}>
                                <h2 className={styles.card__name}>{data.name}</h2>
                                <h4 className={styles.card__date}>{day}.{month}.{year}</h4>
                            </div>
                        </div>
                    </Link>
                :
                    <Link className={styles.link} to={`/${auth.type === 'student' ? 'test' : 'result'}/${data.id}`}>
                        <div className={classnames(styles.card, className)}>
                            <div className={styles.card__group}>
                                <h2 className={styles.card__name}>{data.name}</h2>
                                <h4 className={styles.card__date}>{day}.{month}.{year}</h4>
                            </div>
                        </div>
                    </Link>
            }
        </>
    )
}