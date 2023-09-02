import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Cards } from "../../components/Cards/Cards"
import { Chart } from "../../components/Chart/Chart"
import { Error } from "../../components/Error/Error"
import { Header } from "../../components/Layout/Header"
import { Layout } from "../../components/Layout/Layout"
import { Loading } from "../../components/Loading/Loading"
import { Score } from "../../components/Score/Score"
import { Select } from "../../components/Select/Select"
import { Table } from "../../components/Table/Table"
import { Tabs } from "../../components/Tabs/Tabs"
import { AuthContext } from "../../context/AuthContext"
import { useHttp } from "../../hooks/http.hook"
import styles from "./styles.module.css"

export function ProfilePage() {
    const auth = useContext(AuthContext)
    const [activeTab, setTab] = useState(0)
    const [user, setUser] = useState(null)
    const [activeSubject, setActiveSubject] = useState(null)
    const [activeGrade, setActiveGrade] = useState(null)
    const {loading, error, request} = useHttp()
    const navigate = useNavigate()

    const getUser = useCallback(async () => {
        const userData = await request('/api/user/get', 'POST', {id: auth.userId, type: auth.type})
        setUser(userData)
    }, [request, auth.userId, auth.type])

    useEffect(() => {
        getUser()
    }, [getUser])

    useEffect(() => {
        if (!auth.isAuth) {
            return navigate('/login')
        }
    }, [auth])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('tests'))
    }, [])

    if (loading) {
        return <Loading/>
    }

    return (
        <Layout>
            <Header/>
            <main className={styles.main}>
                <div className={styles.main__body}>
                    {
                        auth.type === 'student' ?
                        <>
                            <div className={styles.main__header}>
                                <h1 className={styles.title}>{user ? user.name : ''}</h1>
                                <h3 className={styles.main__info}>класс: {user ? user.grade : ''}</h3>
                                <div className={styles.main__group}>
                                    <Score value={user ? user.point : ''} text={'Балл:'}/>
                                    <Select func={setActiveSubject}/>
                                </div>
                            </div>
                            <div className={styles.content}>
                                <Cards value={activeSubject}/>
                            </div>
                        </> :
                        <>
                            <div className={styles.main__header}>
                                <h1 className={styles.title}>{user ? user.name : ''}</h1>
                                <h3 className={styles.main__info}>предмет: {user ? user.subject : ''}</h3>
                                <div className={styles.main__group}>
                                    <Tabs activeTab={activeTab} setTab={setTab} text={['Ученики', 'Тесты']} className={styles.pink}/>
                                </div>
                            </div>
                            {
                                !activeTab ?
                                    <div className={styles.content}>
                                        <Select func={setActiveGrade}/>
                                        {activeGrade !== null ? <Table path='/api/user/get_all' params={{dop: activeGrade, type: 'student'}} headers={['№', 'ФИО', 'Оценка']}/> : ''}
                                    </div>
                                :
                                    <div className={styles.content}>
                                        <Select func={setActiveGrade}/>
                                        <Cards value={activeGrade}/>
                                    </div>
                            }
                    </>
                    }
                </div>
            </main>
        </Layout>
    )
}