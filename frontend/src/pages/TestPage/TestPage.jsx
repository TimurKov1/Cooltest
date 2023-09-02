import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Header } from '../../components/Layout/Header'
import { Layout } from '../../components/Layout/Layout'
import { Start } from '../../components/Start/Start'
import { Loading } from "../../components/Loading/Loading"
import { TestQuestions } from '../../components/TestQuestions/TestQuestions'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import styles from './styles.module.css'
import { TestContext } from '../../context/TestContext'
import { ErrorPage } from '../ErrorPage/ErrorPage'

export function TestPage() {
    const {id} = useParams()
    const auth = useContext(AuthContext)
    const [test, setTest] = useState(null)
    const [isTest, setIsTest] = useState(false)
    const [start, setStart] = useState(false)
    const {loading, error, request} = useHttp()

    const getTest = useCallback(async () => {
        const query = await request('/api/test/check_test', 'POST', {userId: auth.userId, testId: id})
        setIsTest(query)
        if (!query.status) {
            const testData = await request(`/api/test/get/${id}`, 'GET')
            setTest(testData)
            if (query.time) {
                setStart(true)
            }
        }
    }, [request, auth.userId, auth.type])

    useEffect(() => {
        getTest()
    }, [getTest])

    if (loading || test === null) {
        return <Loading/>
    }

    if (isTest.status) {
        return <ErrorPage text="Вы уже прошли данный тест!"/>
    }

    return (
        <Layout>
            <main className={styles.test}>
                {
                    !start ?
                        <Start id={id} time={test.time} count={test.count} func={setStart}/>
                    :
                        <TestQuestions data={test} questions={test.questions}/>
                }
            </main>
        </Layout>
    )
}