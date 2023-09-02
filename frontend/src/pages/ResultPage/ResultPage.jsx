import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router"
import { Chart } from "../../components/Chart/Chart"
import { Header } from "../../components/Layout/Header"
import { Layout } from "../../components/Layout/Layout"
import { Loading } from "../../components/Loading/Loading"
import { Select } from "../../components/Select/Select"
import { Table } from "../../components/Table/Table"
import { Tabs } from "../../components/Tabs/Tabs"
import { AuthContext } from "../../context/AuthContext"
import { useHttp } from "../../hooks/http.hook"
import styles from "./styles.module.css"

export function ResultPage() {
    const {id} = useParams()
    const [test, setTest] = useState({})
    const [percent, setPercent] = useState({})
    const [activeGrade, setActiveGrade] = useState(null)
    const auth = useContext(AuthContext)
    const {loading, error, request} = useHttp()
    const [activeTab, setTab] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.isAuth) {
            return navigate('/login')
        } 
        if (auth.type === 'student') {
            return navigate('/profile')
        }
    }, [auth])

    const getInfo = useCallback(async () => {
        const testQuery = await request(`/api/test/get/${id}`, 'GET')
        const percentQuery = await request('/api/test/percent', 'POST', {id: id})
        if (!error) {
            setTest(testQuery)
            setPercent(percentQuery)
        }
    }, [request, id])

    useEffect(() => {
        getInfo()
    }, [getInfo])

    if (loading) {
        return <Loading/>
    }

    return (
        <Layout>
            <Header/>
            <main className={styles.result}>
                <div className={styles.result__top}>
                    <div className={styles.result__info}>
                        <h1 className={styles.result__title}>{test.name}</h1>
                        <div className={styles.result__data}>Время на выполнение: <span className={styles.purple}>{test.time} минут</span></div>
                        <div className={styles.result__data}>Количество вопросов: <span className={styles.purple}>{test.count}</span></div>
                        <div className={styles.result__data}>Классы: <span className={styles.purple}>{test.grades.join(', ')}</span></div>
                    </div>
                    <div className={styles.result__group}>
                        <Chart percent={percent.questions} text='Кол-во правильных ответов'/>
                        <Chart percent={percent.mark} text='Кол-во положительных результатов'/>
                    </div>
                </div>
                <div className={styles.content}>
                    <Select func={setActiveGrade}/>
                    <div className={styles.content__body}>
                        {activeGrade !== null ? <Table className={styles.content__table} path='/api/test/students_passed_test' flag={true} params={{dop: activeGrade, id: parseInt(id)}} headers={['№', 'ФИО', 'Время', 'Ответы', 'Оценка']}/> : ''}
                    </div>
                </div>
            </main>
        </Layout>
    )
}