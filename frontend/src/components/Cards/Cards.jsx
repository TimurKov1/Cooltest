import { useContext, useState, useCallback, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { Card } from '../Card/Card'
import { Loading } from '../Loading/Loading'
import { Search } from '../Search/Search'
import styles from './styles.module.css'

export function Cards({value}) {
    const auth = useContext(AuthContext)
    const [tests, setTests] = useState(null)
    const [testsFilter, setTestsFilter] = useState(null)
    const {loading, error, request} = useHttp()

    const getTests = useCallback(async () => {
        if (auth.type === 'student') {
            const testsData = await request(`/api/test/student/${auth.userId}`, 'GET')
            setTests(testsData)
        } else {
            const testsData = await request(`/api/test/teacher/${auth.userId}`, 'GET')
            setTests(testsData)
        }
    }, [request, auth.userId, auth.type])

    useEffect(() => {
        if (tests !== null) {
            setTestsFilter(tests.tests[value])
        }
    }, [value, tests])

    useEffect(() => {
        getTests()
    }, [getTests])

    if (loading || !value || tests === null || testsFilter == null) {
        return
    }

    return (
        <>
            <Search cards={tests.tests[value]} setCards={setTestsFilter}/>
            <div className={styles.cards}>
                {
                    testsFilter.length === 0 ?
                        <p>По запросу ничего не найдено</p>
                    : 
                        testsFilter.map((item, key) => 
                            <Card className={styles.card_student} key={key} data={item}/>
                        )
                }
            </div>
        </>
    )
}