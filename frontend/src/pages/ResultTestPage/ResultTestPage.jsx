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
import { useNavigate } from 'react-router'

export function ResultTestPage() {
    const {id, userId} = useParams()
    const auth = useContext(AuthContext)
    const [test, setTest] = useState(null)
    const [questions, setQuestions] = useState(null)
    const {loading, error, request} = useHttp()
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.isAuth) {
            return navigate('/login')
        } 
        if (auth.type === 'student') {
            return navigate('/profile')
        }
    }, [auth])

    const getQuestions = useCallback(async () => {
        const testData = await request(`/api/test/get/${id}`, 'GET')
        setTest(testData)

        const query = await request('/api/test/get_student_result', 'POST', {id: id, userId: userId})
        setQuestions(query)
    }, [request, userId, id])

    useEffect(() => {
        getQuestions()
    }, [getQuestions])

    if (loading || test === null) {
        return <Loading/>
    }

    return (
        <Layout>
            <main className={styles.test}>
                <TestQuestions flag={true} rightAnswers={questions} data={test} questions={test.questions}/>
            </main>
        </Layout>
    )
}