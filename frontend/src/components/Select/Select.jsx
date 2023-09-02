import styles from './styles.module.css'
import classnames from 'classnames'
import { useContext, useCallback, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'

export function Select({className, func}) {
    const auth = useContext(AuthContext)
    const [data, setData] = useState(null)
    const {loading, error, request} = useHttp()

    const getData = useCallback(async () => {
        if (auth.type === 'student') {
            const dop = await request('/api/test/subjects', 'POST', {id: auth.userId})
            setData(dop.subjects)
            func(dop.subjects[0])
        } else {
            const dop = await request('/api/test/grades', 'POST', {id: auth.userId})
            setData(dop.grades)
            func(dop.grades[0])
        }
    }, [request, auth.userId])

    useEffect(() => {
        getData()
    }, [getData])

    if (loading || data === null) {
        return
    }

    return (
        <div className={classnames(styles.select, className)}>
            {
                auth.type === 'student' ?
                    <div className={styles.select__text}>Предмет:</div>
                :
                    <div className={styles.select__text}>Класс:</div>
            }
            <select className={styles.select__body} onChange={e => func(e.target.value)}>
                {
                    data.map((item, key) =>
                        <option value={item} key={key}>{item}</option>
                    )
                }
            </select>
        </div>
    )
}