import classnames from 'classnames'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import { TestContext } from '../../context/TestContext'
import { useHttp } from '../../hooks/http.hook'
import styles from './styles.module.css'

export function Timer({id, time, count, index, type}) {
    const [seconds, setSeconds] = useState(parseInt(time) * 60 + 1)
    const auth = useContext(AuthContext)
    const test = useContext(TestContext)
    const navigate = useNavigate()
    const {loading, error, request} = useHttp()

    const getTime = useCallback(async () => {
        const query = await request('/api/test/check_test', 'POST', {userId: auth.userId, testId: id})
        if (!query.status) {
            setSeconds(query.time)
        }
    }, [request, auth.userId, id])

    const passTest = useCallback(async () => {
        try {
            localStorage.removeItem(`test-${id}`)
            const data = await request('/api/test/pass', 'POST', {userId: auth.userId, testId: id, answers: test.answers, time: time, questions: count})
            if (!error) {
                test.setAnswers({})
                if (window.location.pathname == '/profile') {
                    window.location.reload()
                } else {
                    navigate('/profile')
                }
            }
        } catch (e) {}
    }, [request, auth.userId, id, test.answers, time, count])

    useEffect(() => {
        getTime()
    }, [getTime])

    useEffect(() => {
        setTimeout(() => {
            if (seconds === 1) {
                passTest()
            }
            getTime()
        }, 1000)
    }, [seconds, getTime])

    return (
        <div className={classnames(styles.timer, type === 'big' ? styles.timer_big : '')}>
            <div className={styles.timer__flex}>
                <h3 className={classnames(styles.timer__count, type === 'big' ? styles.timer__count_big : '')}>{index + 1} из {count}</h3>
                <h3 className={classnames(styles.timer__time, type === 'big' ? styles.timer__time_big : '')}>{parseInt(seconds / 60) < 10 ? '0' + parseInt(seconds / 60) : parseInt(seconds / 60)}:{seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60}</h3>
            </div>
            <div className={classnames(styles.timer__line, type === 'big' ? styles.timer__line_big : '')}>
                <div className={styles.timer__line_all}></div>
                <div className={styles.timer__line_current} style={{width: seconds / (parseInt(time) * 60) * 100 + '%'}}></div>
            </div>
        </div>
    )
}