import styles from "./styles.module.css"
import { Layout } from "../../components/Layout/Layout"
import { Header } from "../../components/Layout/Header"
import { Input } from "../../components/Input/Input"
import { useContext, useEffect, useState } from "react"
import { Sidebar } from "../../components/Sidebar/Sidebar"
import { Questions } from "../../components/Questions/Questions"
import { QuestionsContext } from "../../context/QuestionsContext"
import { ButtonWhite } from "../../components/Button/ButtonWhite"
import { useHttp } from "../../hooks/http.hook"
import { Loading } from "../../components/Loading/Loading"
import { useNavigate } from "react-router-dom"
import { Grades } from "../../components/Grades/Grades"
import { AuthContext } from "../../context/AuthContext"
import { Error } from "../../components/Error/Error"

export function CreateTestPage() {
    const auth = useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [time, setTime] = useState(0)
    const [activeGrades, setActiveGrades] = useState([])
    const [questions, setQuestions] = useState([])
    const {loading, error, request} = useHttp(false)
    const [wait, setWait] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (wait) {
            setWait(false)
        } else {
            if (!auth.isAuth) {
                return navigate('/login')
            }
            
            if (auth.type !== 'teacher') {
                return navigate('/profile')
            }
        }
    }, [auth])

    async function createHandler() {
        try {
            const data = await request('/api/test/add', 'POST', {id: auth.userId, title: title, time: time, grades: activeGrades, questions: questions}, {
                Authorization: `Bearer ${auth.token}`
            })
            if (!error) {
                navigate('/profile')
            }
        } catch (e) {}
    }

    return (
        <QuestionsContext.Provider value={{
            questions, setQuestions
        }}>
            {
                loading ? <Loading/> : ''
            }
            <Layout>
                <Header page={true}/>
                <main className={styles.main}>
                    <Sidebar/>
                    <div className={styles.main__body}>
                        <Input className={styles.main__title} placeholder="Название..." func={event => setTitle(event.target.value)}/>
                        <div className={styles.main__group}>
                            <h3 className={styles.main__text}>Время на выполнение:</h3>
                            <Input className={styles.main__input} func={event => setTime(parseInt(event.target.value))}/>
                        </div>
                        <Grades activeGrades={activeGrades} setActiveGrades={setActiveGrades}/>
                        <Questions/>
                        {questions.length ? <ButtonWhite text="Сохранить" func={createHandler}/> : ''}
                    </div>
                </main>
            </Layout>
        </QuestionsContext.Provider>
    )
}